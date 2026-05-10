# Plan: GitHub App Auto-Approver with Copilot review gate (4-eyes principle)

## Context

Branch protection on `main` will require 1 approver. Automated PRs (Dependabot patch/minor, Release PRs) should be reviewed, approved and merged without human intervention — but only when Copilot's automated code review finds no issues. The flow is:

```
Copilot reviews PR
  └─ 0 inline comments → bot App approves → auto-merge queues
  └─ >0 inline comments → no approval, PR waits for human
```

The repo already uses GitHub App tokens for releases (`RELEASE_APP_TOKEN` + `obtain-github-app-installation-access-token`). A new `APPROVE_APP_TOKEN` secret follows the same pattern.

**Key facts from research:**
- Copilot bot login: `copilot-pull-request-reviewer[bot]`
- Copilot always posts `COMMENTED` state (never `APPROVED`) — cannot satisfy branch protection itself
- "Clean" signal: Copilot review has **0 inline comments** (checked via `GET /repos/{owner}/{repo}/pulls/{pr}/reviews/{review_id}/comments`)
- "Has issues": >0 inline comments
- "Couldn't review": body contains `"wasn't able to review"` — treat as neutral (don't block, don't approve)

**Key finding in existing code:** `job.release-complete.yaml` uses `GITHUB_TOKEN` to self-approve and merge the Release PR. Once branch protection requires 1 approver, GitHub will reject this self-approval. The `createReview` call must be removed and replaced by the App-token flow.

---

## Part 1: Manual GitHub App Setup (user must do this first)

1. Go to **GitHub → Settings → Developer Settings → GitHub Apps → New GitHub App**
2. Fill in:
   - **Name**: `buddy-harmony-approver`
   - **Homepage URL**: `https://github.com/Marthijs-Berfelo/buddy-harmony`
   - **Webhook**: uncheck "Active"
3. **Repository permissions**: `Pull requests: Read and Write`, `Contents: Read-only`, everything else: None
4. **Where installed**: Only on this account
5. Click **Create GitHub App** — note the **App ID**
6. Scroll to **Private keys → Generate a private key** — download the `.pem` file
7. Click **Install App** → install on `buddy-harmony` repo
8. Note the **Installation ID** from the URL: `github.com/settings/installations/<ID>`

**Build the secret value** (run locally):
```bash
APP_ID=<App ID>
INSTALL_ID=<Installation ID>
PEM=$(cat your-app.pem | awk '{printf "%s\\n", $0}')
echo "{\"appId\":\"$APP_ID\",\"privateKey\":\"$PEM\",\"installationId\":\"$INSTALL_ID\"}"
```

9. Add repo secret **`APPROVE_APP_TOKEN`** — Settings → Secrets and variables → Actions → New repository secret

> **Alternative**: if the existing release App already has `pull_requests: write`, reuse `RELEASE_APP_TOKEN` value for `APPROVE_APP_TOKEN`.

---

## Part 2: Enable Copilot code review

In the repo **Settings → Copilot → Code review** (or via rulesets):
- Enable automatic Copilot review requests on PRs targeting `main`

This ensures every Dependabot and Release PR gets reviewed by Copilot automatically.

---

## Part 3: Branch Protection (UI)

Settings → Branches → Add rule for `main`:

| Setting | Value |
|---|---|
| Require a pull request before merging | ✓ |
| Required approvals | 1 |
| Dismiss stale reviews on new commits | ✓ |
| Require status checks to pass | ✓ (add `QA` and `Build` checks) |
| Require branches to be up to date | ✓ |
| Do not allow bypassing | leave unchecked (App still needs to merge) |

---

## Part 4: New file — `.github/workflows/job.auto-approve.yaml`

Reusable job. Mirrors token pattern from `job.release.yaml` exactly.

```yaml
name: Auto Approve
on:
  workflow_call:
    inputs:
      pr-number:
        required: true
        type: string
    secrets:
      APPROVE_TOKEN:
        required: true

jobs:
  approve:
    name: Approve PR
    runs-on: ubuntu-latest
    steps:
      - name: Obtain GitHub App Installation Access Token
        id: get_token
        run: |
          TOKEN="$(npx obtain-github-app-installation-access-token ci ${{ secrets.APPROVE_TOKEN }})"
          echo "::add-mask::$TOKEN"
          echo "approve_token=$TOKEN" >> $GITHUB_ENV

      - name: Approve PR
        run: gh pr review "${{ inputs.pr-number }}" --approve --repo "$GITHUB_REPOSITORY"
        env:
          GH_TOKEN: ${{ env.approve_token }}
```

---

## Part 5: New file — `.github/workflows/copilot-review-gate.yaml`

Fires when Copilot submits a review. Checks for 0 inline comments, then calls the auto-approve job and queues auto-merge.

```yaml
name: Copilot review gate
on:
  pull_request_review:
    types:
      - submitted

permissions:
  contents: write
  pull-requests: write

jobs:
  check-copilot-review:
    name: Check Copilot review
    runs-on: ubuntu-latest
    if: github.event.review.user.login == 'copilot-pull-request-reviewer[bot]'
    outputs:
      clean: ${{ steps.check.outputs.clean }}
    steps:
      - name: Check for inline comments
        id: check
        run: |
          REVIEW_ID="${{ github.event.review.id }}"
          PR_NUMBER="${{ github.event.pull_request.number }}"
          BODY="${{ github.event.review.body }}"

          # If Copilot couldn't review the files, treat as neutral — skip
          if echo "$BODY" | grep -q "wasn't able to review"; then
            echo "clean=skip" >> $GITHUB_OUTPUT
            exit 0
          fi

          COUNT=$(gh api repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/reviews/$REVIEW_ID/comments --jq 'length')
          if [ "$COUNT" = "0" ]; then
            echo "clean=true" >> $GITHUB_OUTPUT
          else
            echo "clean=false" >> $GITHUB_OUTPUT
          fi
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  approve:
    name: Approve PR
    needs: check-copilot-review
    if: needs.check-copilot-review.outputs.clean == 'true'
    uses: ./.github/workflows/job.auto-approve.yaml
    with:
      pr-number: ${{ github.event.pull_request.number }}
    secrets:
      APPROVE_TOKEN: ${{ secrets.APPROVE_APP_TOKEN }}

  auto-merge:
    name: Queue auto-merge
    runs-on: ubuntu-latest
    needs:
      - check-copilot-review
      - approve
    if: needs.check-copilot-review.outputs.clean == 'true'
    steps:
      - name: Enable auto-merge
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This workflow is **not scoped to Dependabot only** — it fires on any PR where Copilot reviews cleanly. That covers both Dependabot PRs and Release PRs automatically, without needing per-workflow wiring.

---

## Part 6: Simplify `dependabot-auto-merge.yaml`

Replace the current auto-merge step with a Copilot review request. The merge is now handled by `copilot-review-gate.yaml` once Copilot responds.

```yaml
name: Dependabot auto-merge
on: pull_request_target

permissions:
  pull-requests: write

jobs:
  auto-merge:
    name: Auto-merge non-major bumps
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - name: Fetch Dependabot metadata
        id: metadata
        uses: dependabot/fetch-metadata@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Request Copilot review
        if: |
          steps.metadata.outputs.update-type == 'version-update:semver-patch' ||
          steps.metadata.outputs.update-type == 'version-update:semver-minor'
        run: gh pr edit "$PR_URL" --add-reviewer copilot
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Part 7: Update `job.release-complete.yaml`

Remove the `createReview` call (now handled by the Copilot gate). Keep only the merge:

```yaml
name: Release
on:
  workflow_call:

jobs:
  complete:
    name: Merge PR
    runs-on: ubuntu-latest
    steps:
      - name: Merge Release PR
        uses: actions/github-script@v6.4.0
        with:
          script: |
            const repository = context.repo
            const pullRequest = context.payload.pull_request
            const release = pullRequest.head.ref

            await github.rest.pulls.merge({
              merge_method: "merge",
              owner: repository.owner,
              pull_number: pullRequest.number,
              repo: repository.repo,
              commit_title: `Complete ${release} [skip ci]`
            })
```

Release PRs also need Copilot assigned. Add a step to `pr-build.yaml` to request Copilot review on Release PRs (if not auto-enabled via the repo setting from Part 2):

```yaml
  request-copilot-review:
    name: Request Copilot review
    if: startsWith(github.head_ref, 'Release')
    runs-on: ubuntu-latest
    steps:
      - run: gh pr edit "$PR_URL" --add-reviewer copilot
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> **Note**: if the repo-level Copilot auto-review setting (Part 2) covers all PRs, this step is redundant.

---

## Files summary

| Action | File |
|---|---|
| **Create** | `.github/workflows/job.auto-approve.yaml` |
| **Create** | `.github/workflows/copilot-review-gate.yaml` |
| **Modify** | `.github/workflows/dependabot-auto-merge.yaml` |
| **Modify** | `.github/workflows/job.release-complete.yaml` |
| **Modify** (optional) | `.github/workflows/pr-build.yaml` — add Copilot review request for Release PRs |

---

## End-to-end flow summary

```
Dependabot opens patch/minor PR
  → dependabot-auto-merge: requests Copilot review
  → Copilot posts COMMENTED review
      ↓ 0 inline comments          ↓ >0 inline comments
  copilot-review-gate:          no approval posted
    bot App approves              PR waits for human
    gh pr merge --auto --squash
      ↓ CI passes
    PR merges

Release PR opened (startsWith 'Release')
  → Copilot auto-review fires (via repo setting)
      ↓ 0 inline comments
  copilot-review-gate: bot App approves
  pr-build: build passes → job.release-complete merges
```

---

## Verification

```bash
# Confirm bot approval posted
gh pr view <PR> --json reviews --jq '.reviews[] | {author: .author.login, state}'
# Expected: {"author": "buddy-harmony-approver[bot]", "state": "APPROVED"}

# Confirm Copilot review has 0 inline comments
REVIEW_ID=$(gh api repos/Marthijs-Berfelo/buddy-harmony/pulls/<PR>/reviews \
  --jq '.[] | select(.user.login == "copilot-pull-request-reviewer[bot]") | .id')
gh api repos/Marthijs-Berfelo/buddy-harmony/pulls/<PR>/reviews/$REVIEW_ID/comments --jq 'length'
# Expected: 0
```