# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code configuration

All project-specific Claude Code configuration belongs in this repo, not in global settings:
- **Permissions & settings** → `.claude/settings.json` (committed)
- **Local overrides** → `.claude/settings.local.json` (gitignored)
- **Implementation plans** → `.claude/plans/` (gitignored — local working notes, not committed)
- **Project instructions** → this file (`CLAUDE.md`)

Never store buddy-harmony permissions or plans in `~/.claude/`.

## Commands

```shell
npm start           # dev server
npm test            # run all tests with coverage
npm run lint        # lint (quiet)
npm run format      # lint + auto-fix
npm run typecheck   # tsc --noEmit
npm run build       # production build
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
  app.tsx                    # root — BrowserRouter + TranslationsProvider + layout shell
  modules/                   # feature pages (chord | scale | caged)
  components/
    fretboard/               # SVG rendering engine (shared across all modules)
    toolbar/                 # shared selector components (key, chord, scale)
    ui/                      # generic UI primitives (loaders, buttons, dropdowns, …)
  layout/                    # Header / Content / Footer / Toolbar
  routing/pages.ts           # Pages enum — the four routes
  hooks/
    settings/                # global SettingsContext (orientation, guitar type, tuning, …)
    constants.ts             # GuitarType / StringTuningType / guitar lists
    chord-db.ts              # thin wrapper over @tombatossals/chords-db
    use-keys.ts              # musical key selection hook
```

### Settings context

`SettingsContextProvider` (wraps the entire app) owns all user-facing settings and exposes them via `useSettings()`. Any component that needs orientation, left-handed mode, fret-number style, string count, or diagram style should read from this context — never manage that state locally.

### SVG rendering engine (`components/fretboard/`)

`Diagram` is the single entry-point SVG component. It composes:
- `Fretboard` — string and fret lines
- `ScaleShape` / `ChordShape` — note dots
- `FretNumbers` — Latin or Roman numeral fret markers
- `Tuning` — open-string note labels

All geometry is driven by a `DiagramStyle` object (created by `diagramStyle()` in `utils/diagram-style.ts`; the singleton `DEFAULT_STYLE` is used everywhere). Orientation flipping (vertical ↔ horizontal) and left-handed mirroring are handled by `useDirectional` in `utils/directional.ts`.

### Feature modules

Each module under `modules/<name>/` follows the same pattern:
- `<name>-page.tsx` — page wrapper (renders toolbar + content)
- `components/<name>-tool-bar.tsx` — module-specific toolbar
- `components/<name>-content.tsx` — renders one or more `<Diagram>` components
- `hooks/<name>-provider.tsx` — Context provider owning all business logic for the module (state, `printRef`, composition of `useKeys`/`useSettings`/data hooks) plus its `use<Name>` accessor hook; there is no separate standalone hook file — see "File naming & exports" below

Chord and CAGED modules share `chordGuitarTypes` (instruments from chords-db); the scale module uses `scaleGuitarTypes` (hardcoded tunings). The CAGED module additionally uses `caged-constants.ts` (chord-to-CAGED config map) and `caged-utils.ts` (chord building logic).

### Data sources

| Data | Source |
|---|---|
| Chord positions | `@tombatossals/chords-db` via `hooks/chord-db.ts` |
| Music theory (keys, intervals) | `@tonaljs/tonal` |
| Scale shapes | `guitar-scales` package |

### Internationalisation

All user-facing strings go through `i18next` / `react-i18next`. Translation files live in `public/` (loaded at runtime via `i18next-http-backend`). The `<TranslationsProvider>` in `translations.tsx` initialises i18next.

### Styling conventions

Use Tailwind utility classes for styling, not inline `style={{}}` objects. Reserve inline `style` for genuinely dynamic per-instance values (e.g. a computed position or an index-based `animationDelay`) that can't be expressed as a class.

Custom `@keyframes`/animations belong in a CSS file co-located next to the component that uses them (e.g. `fretboard-dots-loader.css` beside `fretboard-dots-loader.tsx`), imported with `import './foo.css'` — not appended to the shared `src/index.css`. Shared/global styles (e.g. `common/Page.css`) are the exception, reserved for styles genuinely shared across multiple modules.

### File naming & exports

- **Filenames are kebab-case** for every `.ts`/`.tsx` file (e.g. `chord-selector.tsx`, `settings-context-provider.tsx`), including test files (`chord-selector.spec.tsx`). No PascalCase or camelCase filenames.
- **Named exports only.** Components, hooks, and utilities are exported as `export const Foo = ...` / `export function useFoo() {...}`, never `export default`. This keeps import statements self-documenting and rename-safe.
  - The one unavoidable exception is `React.lazy()`, which requires a module with a `default` export. At those call sites, map the named export instead of adding a real default export: `lazy(() => import('./foo').then((m) => ({ default: m.Foo })))`.
- **Context modules follow the `*-provider.tsx` pattern**: a single file exports both the `<Name>Provider` component and its `use<Name>` accessor hook. There is no separate `use-<name>.ts` hook file — the provider owns all state and logic directly, and `useRef` values (like `printRef`) are created inside the provider, not passed in as props.

## CI / GitHub Actions

Reusable jobs live in `.github/workflows/job.*.yaml` and are composed by the trigger workflows.

### Trigger workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `pr-build.yaml` | PR opened / updated → `main` | Runs QA (lint + typecheck + test + coverage report) and build |
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