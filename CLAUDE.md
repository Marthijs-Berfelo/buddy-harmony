# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code configuration

All project-specific Claude Code configuration belongs in this repo, not in global settings:
- **Permissions & settings** → `.claude/settings.json` (committed)
- **Local overrides** → `.claude/settings.local.json` (gitignored)
- **Project instructions** → this file (`CLAUDE.md`)

Never store buddy-harmony permissions or plans in `~/.claude/`.

## Commands

```shell
npm start          # dev server
npm test           # run all tests with coverage
npm run lint       # lint (quiet)
npm run format     # lint + auto-fix
npm run build      # production build
```

Run a single test file:
```shell
npx vitest run src/modules/caged/hooks/__tests__/caged-utils.spec.ts
```

## Architecture

**Buddy Harmony** is a Create React App / TypeScript app that renders interactive SVG guitar diagrams (chords, scales, CAGED system). It is deployed to GitHub Pages.

### Layers

```
src/
  App.tsx                    # root — BrowserRouter + TranslationsProvider + layout shell
  modules/                   # feature pages (chord | scale | caged)
  common/
    fretboard/               # SVG rendering engine (shared across all modules)
    layout/                  # Header / Content / Footer
    toolbar/                 # shared selector components (key, chord, scale)
    routing/pages.ts         # Pages enum — the four routes
  hooks/
    settings/                # global SettingsContext (orientation, guitar type, tuning, …)
    constants.ts             # GuitarType / StringTuningType / guitar lists
    chord-db.ts              # thin wrapper around @tombatossals/chords-db
    use-keys.ts              # musical key selection hook
```

### Settings context

`SettingsContextProvider` (wraps the entire app) owns all user-facing settings and exposes them via `useSettings()`. Any component that needs orientation, left-handed mode, fret-number style, string count, or diagram style should read from this context — never manage that state locally.

### SVG rendering engine (`common/fretboard/`)

`Diagram` is the single entry-point SVG component. It composes:
- `Fretboard` — string and fret lines
- `ScaleShape` / `ChordShape` — note dots
- `FretNumbers` — Latin or Roman numeral fret markers
- `Tuning` — open-string note labels

All geometry is driven by a `DiagramStyle` object (created by `diagramStyle()` in `utils/diagram-style.ts`; the singleton `DEFAULT_STYLE` is used everywhere). Orientation flipping (vertical ↔ horizontal) and left-handed mirroring are handled by `useDirectional` in `utils/directional.ts`.

### Feature modules

Each module under `modules/<name>/` follows the same pattern:
- `<Name>Page.tsx` — page wrapper (holds `printRef`, renders toolbar + content)
- `components/<Name>ToolBar.tsx` — module-specific toolbar
- `components/<Name>Content.tsx` — renders one or more `<Diagram>` components
- `hooks/use-<name>.ts` — all business logic; composes `useKeys`, `useSettings`, and data hooks, returns a typed hook interface

Chord and CAGED modules share `chordGuitarTypes` (instruments from chords-db); the scale module uses `scaleGuitarTypes` (hardcoded tunings). The CAGED module additionally uses `caged-constants.ts` (chord-to-CAGED config map) and `caged-utils.ts` (chord building logic).

### Data sources

| Data | Source |
|---|---|
| Chord positions | `@tombatossals/chords-db` via `hooks/chord-db.ts` |
| Music theory (keys, intervals) | `@tonaljs/tonal` |
| Scale shapes | `guitar-scales` package |

### Internationalisation

All user-facing strings go through `i18next` / `react-i18next`. Translation files live in `public/` (loaded at runtime via `i18next-http-backend`). The `<TranslationsProvider>` in `translations.tsx` initialises i18next.

## CI / GitHub Actions

Reusable jobs live in `.github/workflows/job.*.yaml` and are composed by the trigger workflows.

### Trigger workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `pr-build.yaml` | PR opened / updated → `main` | Runs QA (lint + test + coverage report) and build |
| `main-build.yaml` | Push to `main` | Same as PR build; also updates the coverage badge |
| `release-build.yaml` | Push to `release/**` | Runs QA, build, publishes a release, deploys to GitHub Pages |
| `dependabot-auto-merge.yaml` | Dependabot PR opened | Auto-merges patch and minor bumps after CI passes |

### Project board automation

All automation uses `PROJECT_ADD_TOKEN` (a PAT with `project` write scope stored as a repository secret).

| Workflow | Trigger | What it does |
|---|---|---|
| `new-pull-requests.add.yaml` | PR opened | Adds non-Dependabot PRs to the project board; for major Dependabot bumps: adds to board, creates a tracking issue, and links it via `Closes #X` in the PR body |
| `new-issues.add.yaml` | Issue opened | Adds new issues to the project board |
| `pr-close-done.yaml` | PR merged or closed → `main` | Moves the PR's board item to **Done** |
| `issue-close-done.yaml` | Issue closed | Moves the issue's board item to **Done** |
| `dependabot-close-issue.yaml` | Dependabot PR closed without merge | Closes the linked tracking issue (which then triggers `issue-close-done`) |

### Dependabot flow for major bumps

```
PR opened
  → added to board
  → tracking issue created + linked (Closes #X)
      ↓ PR merged          ↓ PR closed (superseded)
  GitHub closes issue    dependabot-close-issue closes issue
         ↓                          ↓
    issue-close-done sets board item to Done
```

Patch/minor bumps skip the board and issue entirely — they auto-merge silently.