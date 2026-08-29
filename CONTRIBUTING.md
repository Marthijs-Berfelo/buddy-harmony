# Contributing to Buddy Harmony

This guide is for anyone who wants to contribute to Buddy Harmony. Developers, musicians, open source enthusiasts.

Proposing new features, reporting bugs is just as important for progressing the project as the actual development.

## Prerequisites

To compile, test and contribute towards the code and document you will need:
- [git](https://git-scm.com/)
- NodeJs [use NVM](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html) - version: see [.nvmrc](./.nvmrc)

## Fork the Repository

Begin at GitHub by forking buddy-harmony, then clone your fork locally. 

Add the conventional [upstream][] `git` remote in order to fetch changes from buddy-harmony's main
branch and to create pull requests:

```shell
$ git remote add upstream https://github.com/Marthijs-Berfelo/buddy-harmony.git
```

## Build Your Changes

With the prerequisites installed and your fork of buddy-harmony cloned, you can make changes to local buddy-harmony
source code.

Run `npm start` to start buddy harmony:

```shell

$ npm start 
```

## Testing

The buddy-harmony test suite is divided into two sections:
- The standard unit test suite
- Linting
To run the standard test suite:
```npm test```

To run the linting:
```npm run lint```

### Writing tests

### Unit Tests

Unit tests should be isolated (see what is an unencapsulated test).

## Commit messages

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.
Commit messages must use the format:

```
type(scope): short description
```

Accepted types (enforced in CI, see below): `feat`, `feature`, `fix`, `perf`, `revert`, `refactor`,
`deps`, `deps-dev`, `deps-ci`, `chore`, `ci`, `docs`, `style`, `test`, `build`.

`deps`/`deps-dev`/`deps-ci` are reserved for Dependabot's own commits (configured in
[`dependabot.yml`](./.github/dependabot.yml)) and drive dedicated changelog sections — don't use
them by hand for a manual dependency bump, use `chore` instead.

The scope is optional — use the GitHub issue ID when relevant (e.g. `fix(#42): ...`).

Use the interactive commit prompt to avoid getting the format wrong:

```shell
$ npm run commit
```

This runs [commitizen](https://github.com/commitizen/cz-cli) and guides you through type, scope,
and description step by step.

> **Note:** The exact message `chore: release v<version>` is reserved for automated release commits
> (see `release-it.git.commitMessage` in [package.json](./package.json) and the release preflight
> check in [`job.release.yaml`](./.github/workflows/job.release.yaml)). Don't use this literal format
> for a manual commit — the release pipeline uses it to detect and skip re-releasing a release.

Every commit on a pull request is checked against
[`commitlint.config.cjs`](./commitlint.config.cjs) in CI (this repo merges via rebase, so every
individual commit lands on `main` — not just the PR title). A commit with an unrecognized type
fails the check; fix it locally with `git commit --amend` or an interactive rebase before pushing.

## Pull-requests

When creating a pull-request, please include a description of your change and if it's related to an existing
issue reference the issue so it will be linked, see [github: link a pull-request](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)
