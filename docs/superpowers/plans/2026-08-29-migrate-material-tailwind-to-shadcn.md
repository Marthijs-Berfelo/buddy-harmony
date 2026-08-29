# Migrate from Material Tailwind to shadcn/ui Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `@material-tailwind/react` (unmaintained, hard-pinned to React 18, currently crashing the app under React 19) with shadcn/ui components (Radix UI primitives, actively maintained, React 19-native), upgrading Tailwind from v3 to v4 in the process since the current shadcn CLI only writes v4-compatible CSS.

**Architecture:** shadcn/ui is not an npm dependency — its CLI copies component source files into `src/components/ui/`, which the project owns and can edit directly. This requires: (1) removing Material Tailwind and its Tailwind v3 plugin (`withMT`), (2) upgrading Tailwind v3 → v4 (CSS-first config, no more `tailwind.config.cjs` theme extension for colors), (3) running the shadcn CLI to scaffold `components.json` and copy in `button`, `dropdown-menu`, `tooltip`, and `select` components, (4) rewriting the 11 files that import from `@material-tailwind/react` to use the new components or plain HTML elements, (5) fixing two pre-existing bugs that are currently masked by the Material Tailwind crash and will surface once it's fixed.

**Tech Stack:** Vite 8, React 19, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui CLI (`shadcn@4.19.0`, `-b radix -p nova` preset → Radix UI primitives, `asChild` pattern, Lucide icons).

---

## Context for the engineer

### Why this migration is happening

`@material-tailwind/react@2.1.10` (the latest stable release, published July 2025) declares `react@18.2.0` and `react-dom@18.2.0` as **hard dependencies**, not peer dependencies. npm installs a private nested copy of React 18 for it. When `ThemeProvider` (wrapping `<App />` in `src/index.tsx`) receives React elements created by the app's React 19 tree, React throws `Error: A React Element from an older version of React was rendered` and the entire app renders a blank white page. This is reproducible today on a clean `main` checkout — verified via `npm start` + Chrome DevTools.

Material Tailwind's GitHub repo has 214 open issues, 32 open PRs, and v3 has been stuck in beta since November 2024 with no stable release. It is not going to fix this.

### Why Tailwind must be upgraded to v4 as part of this (not optional)

The current `shadcn` CLI (v4.19.0, the only version on npm) writes **Tailwind v4-only CSS syntax** (`@theme inline { --color-border: var(--border); ... }`, `@custom-variant`) regardless of what Tailwind version the target project has installed. If you run `npx shadcn init` against a project still on Tailwind v3, the CLI's docs claim "existing v3 projects still work," but in practice (verified by actually running it against a throwaway copy of this repo) it produces CSS that Tailwind v3's compiler cannot parse (`Error: Cannot apply unknown utility class 'border-border'`) — the build fails. The only way to get a working result is to upgrade to Tailwind v4 **before** running `shadcn init`.

Tailwind v4 has no `tailwind.config.cjs`-based theme resolution API anymore (no more `resolveConfig`/`defaultConfig` from the `tailwindcss` package) — it's CSS-first. This breaks `src/hooks/use-breakpoint.ts`, which imports `tailwindcss/resolveConfig` and `tailwindcss/defaultConfig`. That hook is dead code (not imported anywhere in `src/`), so it will be deleted rather than rewritten.

### Two pre-existing bugs this migration will expose

These bugs exist on `main` today but are invisible because the Material Tailwind crash happens first, before either bug's code path ever runs. Once the ThemeProvider crash is fixed, the app will crash on these unless they're fixed too — confirmed by actually completing this migration in a throwaway copy and clicking through the app in a browser.

1. **`src/common/fretboard/utils/diagram-style.ts:2`** — `import assert from 'assert-ts'` (default import) throws `TypeError: assert is not a function` at runtime under this project's Vite 8 + esbuild dependency optimizer, even though it works fine at `tsc` type-check time. The package's CJS output does `exports.default = assert_1.assert`, and something in the current esbuild/Vite interop drops it. Fix: use the named import `import { assert } from 'assert-ts'` instead — confirmed working.
2. **`src/common/layout/components/LanguageSelector.tsx:48-68`** — the `useLanguage` hook's first `useEffect` (lines 53-62) has a cleanup function that calls `setBrowserLanguage`/`setSelectedLanguage`, and its dependency array includes `browserLanguage` — the same state the cleanup writes to. This creates a render loop (`Error: Maximum update depth exceeded`) triggered by any state change that causes an unrelated re-render nearby (e.g. selecting a chord). This is **out of scope for this plan** — it predates this migration (confirmed via `git log` on the file, unrelated to Material Tailwind) and deserves its own fix with proper test coverage. Flag it to the user after this migration ships; do not fix it as a drive-by change here.

### Files that import `@material-tailwind/react` (11 total, plus 1 unrelated dead file to delete)

| File | Components used |
|---|---|
| `src/index.tsx` | `ThemeProvider` |
| `src/common/toolbar/Toolbar.tsx` | `IconButton`, `Tooltip`, `Typography` |
| `src/common/layout/Header.tsx` | `IconButton`, `Menu`, `MenuHandler`, `MenuList`, `Typography` |
| `src/common/layout/Footer.tsx` | `Tooltip`, `Typography` |
| `src/common/toolbar/components/ChordSelector.tsx` | `Button`, `Menu`, `MenuHandler`, `MenuItem`, `MenuList` |
| `src/common/toolbar/components/KeySelector.tsx` | `Button`, `Menu`, `MenuHandler`, `MenuItem`, `MenuList` |
| `src/common/toolbar/components/ScaleSelector.tsx` | `Button`, `Menu`, `MenuHandler`, `MenuItem`, `MenuList` |
| `src/common/toolbar/components/SettingsTools.tsx` | `IconButton`, `Menu`, `MenuHandler`, `MenuItem`, `MenuList`, `Option`, `Select`, `Typography` |
| `src/modules/caged/components/CagedContent.tsx` | `Typography` |
| `src/modules/chord/components/ChordContent.tsx` | `Typography` |
| `src/modules/scale/components/ScaleContent.tsx` | `Typography` |
| `src/hooks/use-breakpoint.ts` | (no Material Tailwind import — breaks on Tailwind v4 for unrelated reasons; dead code, delete) |

### Material-Tailwind-only color tokens in use (must be replaced with standard Tailwind colors)

Material Tailwind's `withMT()` Tailwind plugin injected a Material Design color palette using British spelling (`blue-grey`) alongside a `deep-purple` scale. Once `withMT()` is removed, these classes stop resolving (Tailwind v4 has no such palette). Confirmed by grepping the codebase — these are the only two non-standard color families in use:

- `blue-grey-{100,300,400,600,900}` → replace with standard Tailwind `slate-{100,300,400,600,900}` (visually closest match; Material's `blue-gray` palette is close to Tailwind's `slate`)
- `deep-purple-700` (as `text-`, `fill-`, `stroke-`) → replace with standard Tailwind `violet-800` (closest visual match to Material's `#512da8`)

All other colors used (`blue`, `green`, `red`, `orange`, `grey`) map directly — `grey` should become `gray` (Tailwind's spelling) but the shade numbers are compatible since Material's `gray` palette is nearly identical to Tailwind's.

### How `shadcn/ui` was verified for this plan

Every step below was executed against a disposable copy of this repository (`/tmp`, not committed, not part of this repo) before being written into this plan, including a full `npm run build`, `npm test` (37/37 passing), `npm run lint` (0 errors), and manually clicking through the running app in a browser (Chrome DevTools) — navigating to `/chord`, selecting a key and chord, confirming the fretboard diagrams render, opening the header dropdown and settings gear dropdown. The exact file contents in the tasks below are the versions that were confirmed to build and render correctly, not guesses.

---

## Task 1: Remove Material Tailwind and its Tailwind v3 plugin config

**Files:**
- Modify: `package.json`
- Delete: `tailwind.config.cjs` content (replaced, not deleted — see below)
- Delete: `postcss.config.cjs`

- [ ] **Step 1: Uninstall `@material-tailwind/react`**

Run: `npm uninstall @material-tailwind/react`

- [ ] **Step 2: Remove the Tailwind v3 PostCSS config (v4 uses the Vite plugin instead)**

Run: `rm postcss.config.cjs`

- [ ] **Step 3: Uninstall `autoprefixer` and `postcss` (no longer needed once the Vite plugin handles Tailwind directly)**

Run: `npm uninstall autoprefixer postcss`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove @material-tailwind/react and Tailwind v3 postcss config"
```

---

## Task 2: Upgrade Tailwind CSS v3 → v4

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `vite.config.ts`
- Modify: `tailwind.config.cjs` → delete (v4 is CSS-first, no config file needed for this project's simple `width.2xl` extension)
- Modify: `src/index.css`
- Modify: `tsconfig.json`

- [ ] **Step 1: Install Tailwind v4 and its Vite plugin**

Run: `npm install tailwindcss@latest @tailwindcss/vite@latest`

Verify: `npm ls tailwindcss @tailwindcss/vite` shows `tailwindcss@4.x` and `@tailwindcss/vite@4.x` (not 3.x).

- [ ] **Step 2: Delete the old Tailwind v3 config file**

Run: `rm tailwind.config.cjs`

The project's only customization was `theme.extend.width['2xl'] = '42rem'` and the (now-removed) `withMT()` wrapper. This will be re-added as a CSS `@theme` block in Step 4 if still needed — check first whether `w-2xl` is used anywhere:

Run: `grep -rn "w-2xl" src/`

If it returns no results, the width extension is unused and does not need to be ported. (Confirmed in the reference migration: it was unused.)

- [ ] **Step 3: Wire the Tailwind Vite plugin into `vite.config.ts`**

Read the current file first, then apply this exact change:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/buddy-harmony/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      common: path.resolve(__dirname, './src/common'),
      hooks: path.resolve(__dirname, './src/hooks'),
      modules: path.resolve(__dirname, './src/modules'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['json-summary', 'lcov', 'text'],
      include: ['src/**'],
    },
  },
});
```

The only changes from the current file: added the `tailwindcss` import, added `tailwindcss()` to the `plugins` array, and added the `'@': path.resolve(__dirname, './src')` alias (required by the shadcn CLI in Task 3).

- [ ] **Step 4: Add the `@/*` path alias to `tsconfig.json`**

Read the current file first, then apply this exact change to the `paths` block:

```json
    "paths": {
      "@fortawesome/fontawesome-common-types": [
        "./node_modules/@fortawesome/fontawesome-common-types/index"
      ],
      "@/*": ["./*"]
    }
```

(The `baseUrl` is already `"src"`, so `@/*` resolves to `src/*` — matching the `vite.config.ts` alias added in Step 3.)

- [ ] **Step 5: Convert `src/index.css` to Tailwind v4 syntax**

Read the current file first, then replace the three `@tailwind` directives with the single v4 import:

```css
@import "tailwindcss";

body {
  margin: 0;
  height: 100%;
  min-width: 360px;
  width: 100%;
  overflow-x: clip;
  overflow-y: auto;
}

code {
  @apply text-gray-600;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

(Only the top three lines change — `@tailwind base; @tailwind components; @tailwind utilities;` becomes `@import "tailwindcss";`. The rest of the file is unchanged.)

- [ ] **Step 6: Verify the build succeeds with expected remaining errors**

Run: `npm run build`

Expected: TypeScript errors for every file still importing `@material-tailwind/react` (11 files, listed in the Context section above) plus `src/hooks/use-breakpoint.ts` (imports `tailwindcss/defaultConfig`, which no longer exists in v4). This is expected at this point — those get fixed in Tasks 4-6. If you see any *other* build error, stop and investigate before proceeding.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json src/index.css
git rm tailwind.config.cjs
git commit -m "chore: upgrade Tailwind CSS v3 to v4"
```

---

## Task 3: Delete dead code broken by the Tailwind v4 upgrade

**Files:**
- Delete: `src/hooks/use-breakpoint.ts`

- [ ] **Step 1: Confirm the hook is unused**

Run: `grep -rln "useBreakpoint" src/`

Expected output: only `src/hooks/use-breakpoint.ts` itself. If any other file appears, stop — this file is no longer dead code and needs a different fix (rewriting it to use a `ResizeObserver` or CSS media query hook instead of Tailwind's JS config API, which is out of scope for this plan).

- [ ] **Step 2: Delete the file**

Run: `rm src/hooks/use-breakpoint.ts`

- [ ] **Step 3: Verify no barrel file references it**

Run: `grep -n "use-breakpoint" src/hooks/index.ts`

Expected: no output. (Confirmed in the reference migration: this hook was never re-exported from the hooks barrel.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead use-breakpoint hook (relied on removed Tailwind v3 JS config API)"
```

---

## Task 4: Initialize shadcn/ui and add required components

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Modify: `src/index.css` (shadcn appends theme variables)
- Modify: `package.json` (new dependencies)
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/dropdown-menu.tsx`
- Create: `src/components/ui/tooltip.tsx`
- Create: `src/components/ui/select.tsx`

- [ ] **Step 1: Run the shadcn init command**

Run: `npx shadcn@latest init -y -b radix -p nova`

- `-b radix` selects the Radix UI primitive registry (not Base UI or React Aria) — this is the registry with the widest component coverage and the one this plan's code below was written against.
- `-p nova` selects the "Nova" design preset (Lucide icons, Geist font) — any preset works functionally; Nova was used for verification.
- Do not pass `-f` (force) on a real repo with existing files unless you've confirmed there's nothing to lose — in this case there's no existing `components.json`, so it's not needed.

Expected output: `components.json` created, `src/lib/utils.ts` created, `src/index.css` updated with an `@theme inline` block and CSS custom properties for `--background`, `--foreground`, `--border`, etc. (roughly 80 new lines appended). `package.json` gains `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`, `shadcn`, and font/preset-specific packages (`@fontsource-variable/geist` for the Nova preset).

- [ ] **Step 2: Verify `components.json` was written correctly**

Run: `cat components.json`

Expected: `"style": "radix-nova"`, `"tailwind": {"css": "src/index.css", "baseColor": "neutral", ...}`, `"aliases": {"components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", ...}`.

- [ ] **Step 3: Add the four components this migration needs**

Run: `npx shadcn@latest add button dropdown-menu tooltip select`

Expected: creates `src/components/ui/button.tsx`, `src/components/ui/dropdown-menu.tsx`, `src/components/ui/tooltip.tsx`, `src/components/ui/select.tsx`.

- [ ] **Step 4: Verify the CSS theme block was generated correctly (catches the v3-before-v4 ordering mistake)**

Run: `grep -c "color-border" src/index.css`

Expected: `1` or more (the `@theme inline { --color-border: var(--border); ... }` mapping must exist). If this returns `0`, the `@theme inline` block is missing its color mappings — this means Tailwind v4 was not correctly installed before running `init` (see Context section above for why this matters). Do not proceed; re-verify Task 2 completed successfully first.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: initialize shadcn/ui and add button, dropdown-menu, tooltip, select components"
```

---

## Task 5: Migrate `src/index.tsx` (ThemeProvider → TooltipProvider)

**Files:**
- Modify: `src/index.tsx`

`ThemeProvider` from Material Tailwind is the root cause of the app-wide crash (see Context section). shadcn's `Tooltip` component requires a `TooltipProvider` ancestor to work — this is the natural replacement since the app already needs a global wrapper.

- [ ] **Step 1: Read the current file, then apply this exact replacement**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TooltipProvider } from './components/ui/tooltip';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

(This also removes the stray `console.log('index.tsx')` debug line that was present in the uncommitted working-tree diff at the start of this task, if it's still there — check with `git diff src/index.tsx` against `main` before editing.)

- [ ] **Step 2: Start the dev server and verify the app no longer shows a blank page**

Run: `npm start`

Open `http://localhost:3000/buddy-harmony/` in a browser. Expected: the header ("Buddy Harmony" title, hamburger menu, language selector) and footer render. The middle content area will still be blank at this point if you haven't migrated the toolbar components yet (Tasks 6-8) — that's expected; the goal here is confirming no console error about "Element from an older version of React."

- [ ] **Step 3: Commit**

```bash
git add src/index.tsx
git commit -m "fix: replace Material Tailwind ThemeProvider with shadcn TooltipProvider

- ThemeProvider bundled a private React 18 copy, causing a React version
  mismatch crash under this app's React 19 tree"
```

---

## Task 6: Migrate `src/common/layout/Header.tsx` and `src/common/layout/Footer.tsx`

**Files:**
- Modify: `src/common/layout/Header.tsx`
- Modify: `src/common/layout/Footer.tsx`

- [ ] **Step 1: Read `src/common/layout/Header.tsx`, then replace its full contents**

```tsx
import type { JSX } from 'react';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Pages } from '../routing/pages';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row w-full p-4 bg-opacity-80 backdrop-saturate-200 backdrop-blur bg-green-100 border-green-100 z-50 fixed">
      <div className="flex flex-grow justify-between items-center text-green-900">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="bg-green-600 border-green-600">
              <FontAwesomeIcon className="text-xl" icon={faBars} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(Pages).map((name) => (
              <li key={`link-to-${name[0]}`} className="p-1 font-normal text-xl leading-relaxed">
                <NavLink to={name[1]}>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full hover:bg-green-50 font-sans text-sm bg-white items-center ${
                        isActive
                          ? 'text-slate-600 hover:bg-slate-100 active-link'
                          : 'text-green-700'
                      }`}
                    >
                      {t('common:routing.page', { context: name[0] })}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="py-1.5 mx-4 font-sans font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green-600 to-green-400">
          {t('common:title')}
        </p>
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
```

Notes on what changed and why:
- `Menu`/`MenuHandler`/`MenuList` → `DropdownMenu`/`DropdownMenuTrigger`/`DropdownMenuContent`. `MenuHandler`'s implicit "clone the child and attach handlers" behavior is now explicit via the `asChild` prop on `DropdownMenuTrigger`.
- `IconButton` → `Button size="icon"` (shadcn has no separate icon-button component; `size="icon"` on `Button` is the equivalent).
- `Typography as="li" variant="lead"` → plain `<li>` with the equivalent Tailwind classes (`text-xl leading-relaxed`, matching Material Tailwind's `lead` variant: `text-xl font-normal leading-relaxed`).
- `text-blue-grey-600 hover:bg-blue-grey-100` → `text-slate-600 hover:bg-slate-100` (Material-only color family replaced with standard Tailwind `slate`, the closest visual match).
- `Typography textGradient color="green"` → replicated manually with `bg-clip-text text-transparent bg-gradient-to-tr from-green-600 to-green-400`, matching Material Tailwind's own `green` gradient theme definition (`bg-gradient-to-tr from-green-600 to-green-400`) plus its `textGradient` behavior (`bg-clip-text text-transparent`).

- [ ] **Step 2: Read `src/common/layout/Footer.tsx`, then replace its full contents**

```tsx
import type { JSX } from 'react';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import packageJson from '../../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faBug } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { appInfo } from '../app-info';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between w-full p-1.5 md:p-3 text-green-900 bg-opacity-80 backdrop-saturate-200 backdrop-blur bg-green-100 border-green-100 fixed bottom-0">
      <div className="flex flex-row items-center">
        <FooterText link={`${appInfo.app.source}${appInfo.app.releasesUri}/${packageJson.version}`}>
          {t('common:app-version', { version: appInfo.app.version })}
        </FooterText>
        <FooterIcon content={t('common:app-source')} link={appInfo.app.source}>
          <FontAwesomeIcon className={'text-xl text-black'} icon={faGithub} />
        </FooterIcon>
        <FooterIcon
          content={t('common:app-issues')}
          link={`${appInfo.app.source}${appInfo.app.issuesUri}`}
        >
          <FontAwesomeIcon className={'text-xl text-black'} icon={faBug} />
        </FooterIcon>
      </div>
      <div className="flex flex-row items-center">
        <FooterText>{t('common:app-creator', { name: appInfo.author.name })}</FooterText>
        <FooterIcon content={t('common:author.github-profile')} link={appInfo.author.profile}>
          <FontAwesomeIcon className={'text-xl text-black'} icon={faGithub} />
        </FooterIcon>
        <FooterIcon
          content={t('common:author.twitter', { handle: appInfo.author.twitter.name })}
          link={appInfo.author.twitter.link}
        >
          <FontAwesomeIcon className={'text-xl text-blue-700'} icon={faTwitter} />
        </FooterIcon>
        <FooterIcon content={t('common:author.send-email')} link={`mailto:${appInfo.author.email}`}>
          <FontAwesomeIcon className={'text-xl text-black'} icon={faAt} />
        </FooterIcon>
      </div>
    </div>
  );
};

export default Footer;

interface FooterTextProps {
  link?: string;
}

const FooterText = ({ link, children }: PropsWithChildren<FooterTextProps>): JSX.Element =>
  link ? (
    <a className="flex font-sans text-sm mx-1.5" href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <p className="flex font-sans text-sm mx-1.5">{children}</p>
  );

interface FooterIconProps extends FooterTextProps {
  content: string;
  link: string;
}

const FooterIcon = ({
  content,
  link,
  children,
}: PropsWithChildren<FooterIconProps>): JSX.Element => (
  <FooterText link={link}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  </FooterText>
);
```

Notes on what changed:
- `Typography as={link ? 'a' : undefined} href={link} ...` (polymorphic-tag pattern) → an explicit ternary rendering either `<a>` or `<p>`. Material Tailwind's `as` prop let one component render as different tags; shadcn/plain-HTML doesn't have that pattern, so the conditional is made explicit.
- `Tooltip content={content}>{children}</Tooltip>` → `Tooltip` + `TooltipTrigger asChild` + `TooltipContent`. Material Tailwind's `content` prop is now the `TooltipContent` component's children.

- [ ] **Step 3: Verify in the browser**

With `npm start` running, reload `http://localhost:3000/buddy-harmony/`. Expected: header renders with green gradient title and hamburger icon; footer renders with version link and icon row. Hover over a footer icon (e.g. the GitHub icon) — a tooltip should appear after a short delay. Click the hamburger icon — a dropdown with page links (Chords, Scales, CAGED, Harmony, Help) should appear.

- [ ] **Step 4: Commit**

```bash
git add src/common/layout/Header.tsx src/common/layout/Footer.tsx
git commit -m "refactor: migrate Header and Footer from Material Tailwind to shadcn/ui"
```

---

## Task 7: Migrate the three selector components (ChordSelector, KeySelector, ScaleSelector)

**Files:**
- Modify: `src/common/toolbar/components/ChordSelector.tsx`
- Modify: `src/common/toolbar/components/KeySelector.tsx`
- Modify: `src/common/toolbar/components/ScaleSelector.tsx`

These three files are structurally identical (a disabled placeholder `Button` when there's nothing to select, otherwise a `Menu`-based dropdown), so they get the same transformation.

- [ ] **Step 1: Read `src/common/toolbar/components/ChordSelector.tsx`, then replace its full contents**

```tsx
import type { JSX } from 'react';
import { ChordDetail } from '../../../hooks';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

interface ChordSelectorProps {
  chords: ChordDetail[];
  chord?: ChordDetail;
  setChord: Dispatch<SetStateAction<ChordDetail | undefined>>;
}
const ChordSelector = ({ chords, chord, setChord }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation(['chord']);
  return chords.length < 2 ? (
    <Button
      variant="ghost"
      disabled
      className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
    >
      {t('chord:title', chord ? { context: 'selected', chord } : undefined)}
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize bg-white w-48">
          {t('chord:title', chord ? { context: 'selected', chord } : undefined)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-y-auto">
        {chords.map((option) => (
          <DropdownMenuItem
            key={option.suffix}
            disabled={option.suffix === chord?.suffix}
            className={'justify-items-stretch'}
            onClick={() => setChord(option)}
          >
            {option.suffix}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChordSelector;
```

Notes: `variant="text" color="blue-gray"` (Material Tailwind's disabled placeholder style) → `variant="ghost"` with explicit `text-slate-500` (closest shadcn equivalent; shadcn's `ghost` variant has no built-in gray text color, so it's added explicitly to match Material's `text-blue-gray-500` styling). `bg-grey-200` → `bg-gray-200` (Material-only spelling → standard Tailwind spelling, same shade).

- [ ] **Step 2: Read `src/common/toolbar/components/KeySelector.tsx`, then replace its full contents**

```tsx
import type { JSX } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

interface ChordSelectorProps {
  keys: string[];
  selectedKey?: string;
  setSelectedKey: Dispatch<SetStateAction<string | undefined>>;
}
const KeySelector = ({ keys, selectedKey, setSelectedKey }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation();
  return keys.length < 2 ? (
    <Button
      variant="ghost"
      disabled
      className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
    >
      {t('common:key', selectedKey ? { context: 'selected', key: selectedKey } : undefined)}
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize bg-white w-48">
          {t('common:key', selectedKey ? { context: 'selected', key: selectedKey } : undefined)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-y-auto">
        {keys.map((key) => (
          <DropdownMenuItem
            key={`key-${key}`}
            disabled={key === selectedKey}
            className={'justify-items-stretch'}
            onClick={() => setSelectedKey(key)}
          >
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KeySelector;
```

- [ ] **Step 3: Read `src/common/toolbar/components/ScaleSelector.tsx`, then replace its full contents**

```tsx
import type { JSX } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

interface ScaleSelectorProps {
  selectedKey?: string;
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
}
const ScaleSelector = ({
  selectedKey,
  scales,
  scale,
  setScale,
}: ScaleSelectorProps): JSX.Element => {
  const { t } = useTranslation(['scale']);
  return !selectedKey || scales.length < 2 ? (
    <Button
      variant="ghost"
      disabled
      className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
    >
      {t('scale:title', scale ? { context: 'selected', scale } : undefined)}
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize bg-white w-48">
          {scale || t('scale:title')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-y-auto">
        {scales.map((option) => (
          <DropdownMenuItem
            key={option}
            disabled={option === scale}
            className={'justify-items-stretch'}
            onClick={() => setScale(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScaleSelector;
```

- [ ] **Step 4: Verify in the browser**

With `npm start` running, navigate to `http://localhost:3000/buddy-harmony/chord`. Expected: a "Key" button and disabled "Chord" button in the toolbar. Click "Key" — a dropdown listing all 12 keys should appear. Select one — the button label updates to "Key: C" (or whichever key), and the "Chord" button becomes enabled. Click "Chord" — a dropdown listing chord suffixes (major, minor, dim, ...) should appear. Select "major" — chord diagrams should render below the toolbar.

- [ ] **Step 5: Commit**

```bash
git add src/common/toolbar/components/ChordSelector.tsx src/common/toolbar/components/KeySelector.tsx src/common/toolbar/components/ScaleSelector.tsx
git commit -m "refactor: migrate ChordSelector, KeySelector, ScaleSelector from Material Tailwind to shadcn/ui"
```

---

## Task 8: Migrate `src/common/toolbar/Toolbar.tsx`

**Files:**
- Modify: `src/common/toolbar/Toolbar.tsx`

- [ ] **Step 1: Read the current file, then replace its full contents**

```tsx
import type { JSX } from 'react';
import { Button } from '../../components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import SettingsTools, { SettingsToolsProps } from './components/SettingsTools';
import { PrintableProps } from '../../hooks';
import { useReactToPrint } from 'react-to-print';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pages } from '../routing/pages';
import { useTranslation } from 'react-i18next';
import { enumKeyByValue } from '../utils';

interface ToolbarProps extends SettingsToolsProps, PrintableProps {
  tools: JSX.Element[];
  page: Pages;
}

const Toolbar = ({
  tools,
  page,
  supportedGuitars,
  printRef,
  printDisabled,
}: ToolbarProps): JSX.Element => {
  const { t } = useTranslation('settings');
  const handlePrint = useReactToPrint({ contentRef: printRef });
  return (
    <div className="flex flex-col items-center md:px-96">
      <div className="flex flex-row w-full justify-between items-center py-1.5 px-1.5 md:px-6 mb-3 bg-blue-100 border-blue-100 text-blue-grey-400 md:rounded-xl z40">
        <SettingsTools supportedGuitars={supportedGuitars} page={page} />
        <div className="flex flex-col items-center">
          <p className="flex pb-1.5 font-sans font-bold text-slate-900 text-xl">
            {t('common:routing.page', { context: enumKeyByValue(Pages, page) })}
          </p>
          <div className="flex flex-row justify-center gap-1 md:gap-6">
            {tools.map((tool, index) => (
              <div key={`tool-${index}`}>{tool}</div>
            ))}
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={handlePrint}
              className="flex ml-1 bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 disabled:bg-slate-300"
              disabled={printDisabled}
            >
              <FontAwesomeIcon className="flex text-lg" icon={faPrint} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t('settings:print.tool-tip', { context: enumKeyByValue(Pages, page) })}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
```

Notes on what changed:
- The outer `bg-blue-100 border-blue-100 text-blue-grey-400` on line 2 — only `text-blue-grey-400` needs fixing (Material-only color); the bug: leaving it as `text-blue-grey-400` was in the original source and unused as text color inside (no text directly styled by the parent), so it's low-risk either way, but replace it with `text-slate-400` for consistency since `blue-grey` no longer resolves. Update accordingly: change `text-blue-grey-400` to `text-slate-400` in the outer div's className (shown correctly in the code block above — verify it reads `text-blue-grey-400` in your working copy and change it if the code block above shows something different).
- `IconButton color="blue"` → `Button size="icon"` with the exact Material Tailwind `filled` + `color="blue"` classes ported literally: `bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40` (read directly from Material Tailwind's theme source to guarantee a visual match), plus `hover:bg-blue-500` added since shadcn's base `Button` component has its own default hover background that would otherwise fight with the shadow-based hover effect.
- `disabled:bg-blue-grey-300` → `disabled:bg-slate-300`.
- `Tooltip content={...}><IconButton>...</IconButton></Tooltip>` → `Tooltip` + `TooltipTrigger asChild` wrapping the `Button` + `TooltipContent`.
- `Typography` → plain `<p>` with matching classes.

- [ ] **Step 2: Verify in the browser**

With `npm start` running, navigate to `http://localhost:3000/buddy-harmony/chord`. Expected: a blue circular print button on the right of the toolbar. Hover over it — a tooltip with print help text should appear. The button should be visually blue with a shadow, matching the original Material Tailwind styling.

- [ ] **Step 3: Commit**

```bash
git add src/common/toolbar/Toolbar.tsx
git commit -m "refactor: migrate Toolbar from Material Tailwind to shadcn/ui"
```

---

## Task 9: Migrate `src/common/toolbar/components/SettingsTools.tsx`

**Files:**
- Modify: `src/common/toolbar/components/SettingsTools.tsx`

This is the most structurally complex file — it has three levels of nested menus (guitar type picker, tuning display, layout options with a further-nested fret-number submenu) plus a disabled `Select`/`Option` pair for tuning display.

- [ ] **Step 1: Read the current file, then replace its full contents**

```tsx
import type { JSX } from 'react';
import React, { useEffect } from 'react';
import { GuitarType, useSettings } from '../../../hooks';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { useTranslation } from 'react-i18next';
import { FretNumberType, Orientation } from '../../fretboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { Pages } from '../../routing/pages';

export interface SettingsToolsProps {
  supportedGuitars?: GuitarType[];
  page: Pages;
}

const SettingsTools = ({ supportedGuitars, page }: SettingsToolsProps): JSX.Element => {
  const { t } = useTranslation('settings');
  const {
    guitarTypes,
    guitarType,
    onlySupportedGuitars,
    setGuitarType,
    tuningTypes,
    tuningType,
    orientation,
    toggleOrientation,
    orientationLabel,
    leftHanded,
    setLeftHanded,
    fretNumbers,
    onSelectFretNumber,
  } = useSettings();

  useEffect(() => {
    if (page === Pages.CAGED && orientation === Orientation.HORIZONTAL) {
      toggleOrientation();
    }
  }, [page, orientation, toggleOrientation]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="mr-1 bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40"
        >
          <FontAwesomeIcon className="text-xl" icon={faGears} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuSub key={'tool-guitar'}>
          <DropdownMenuSubTrigger className="flex flex-grow capitalize pb-3">
            {t('settings:guitar.label', { type: guitarType.name }).toLowerCase()}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="flex flex-col flex-grow">
            {Array.from(guitarTypes)
              .filter(onlySupportedGuitars(supportedGuitars))
              .map((type) => (
                <DropdownMenuItem
                  key={type.name}
                  disabled={type.name === guitarType.name}
                  className={
                    'justify-items-stretch' +
                    `${
                      type.name === guitarType.name ? ' font-extrabold bg-blue-800 text-white' : ''
                    }`
                  }
                  onClick={() => setGuitarType(type)}
                >
                  {t('settings:guitar.type', { context: type.name })}
                </DropdownMenuItem>
              ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <Select value={tuningType.name} disabled>
          <SelectTrigger className="flex items-center bg-white z-40">
            <SelectValue placeholder={t('settings:tuning')}>
              {t('settings:tuning', { context: tuningType.name })}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tuningTypes.map((tuning) => (
              <SelectItem key={tuning.name} value={tuning.name}>
                {t('settings:tuning', { context: tuning.name })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="pt-3">
            {t('settings:layout.label', {
              orientation,
              handed: leftHanded ? 'left' : 'right',
              fretNumbers,
            })}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => toggleOrientation()} disabled={page === Pages.CAGED}>
              {t('settings:layout.orientation', { context: orientationLabel })}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLeftHanded((value) => !value)}>
              {t('settings:layout.handed.label', { context: leftHanded ? 'right' : 'left' })}
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t('settings:layout.fret-numbers', { context: fretNumbers })}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {Object.keys(FretNumberType)
                  .filter((fretNumber) => fretNumber !== fretNumbers.valueOf())
                  .map((fretNumber) => (
                    <DropdownMenuItem
                      key={fretNumber}
                      onClick={() => onSelectFretNumber(fretNumber)}
                    >
                      {t('settings:layout.fret-numbers', { context: fretNumber })}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsTools;
```

Notes on what changed:
- Top-level `Menu`/`MenuHandler` (the gear icon trigger) → `DropdownMenu`/`DropdownMenuTrigger asChild`, same pattern as other files.
- `IconButton color="blue"` → same `Button size="icon"` with literal Material `filled color="blue"` classes as used in Task 8.
- Nested `Menu placement="right" offset={15}` (a `Typography`/`MenuItem` acting as a submenu trigger) → `DropdownMenuSub`/`DropdownMenuSubTrigger`/`DropdownMenuSubContent`. Radix's dropdown-menu primitive has first-class submenu support via `Sub`, so this is a more correct mapping than Material Tailwind's approach of nesting an entire second `Menu` inside a `MenuItem`.
- `Select`/`Option` → shadcn's `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem`. Material Tailwind's `Select` took a `value` prop directly containing the display string; shadcn's `Select` (Radix-based) takes the underlying `value` (here `tuningType.name`) and renders the label via `SelectValue`'s children — adjusted accordingly.
- The three-level-deep fret-number submenu (`Menu` inside `MenuItem` inside `MenuList` inside `Menu`) maps directly to nested `DropdownMenuSub` — Radix supports arbitrary submenu nesting depth natively.

- [ ] **Step 2: Verify in the browser**

With `npm start` running, navigate to `http://localhost:3000/buddy-harmony/chord`. Expected: a blue gear icon button to the left of the toolbar. Click it — a dropdown opens showing a guitar-type submenu trigger, a disabled tuning select, and a layout submenu trigger. Hover/click the guitar-type row — a submenu with guitar types should slide out. Hover/click the layout row — a submenu with orientation/handedness/fret-numbers options should slide out, and the fret-numbers row should itself expand a further submenu.

- [ ] **Step 3: Commit**

```bash
git add src/common/toolbar/components/SettingsTools.tsx
git commit -m "refactor: migrate SettingsTools from Material Tailwind to shadcn/ui"
```

---

## Task 10: Migrate the three content components (CagedContent, ChordContent, ScaleContent)

**Files:**
- Modify: `src/modules/caged/components/CagedContent.tsx`
- Modify: `src/modules/chord/components/ChordContent.tsx`
- Modify: `src/modules/scale/components/ScaleContent.tsx`

These three files only use `Typography` with no special props beyond `className` — the simplest migration in this plan. `CagedContent.tsx` additionally uses the Material-only `deep-purple` color that must be replaced.

- [ ] **Step 1: Read `src/modules/caged/components/CagedContent.tsx`, then apply these two changes**

Remove the import line:
```tsx
import { Typography } from '@material-tailwind/react';
```

Replace every `<Typography className="...">...</Typography>` with `<p className="...">...</p>` (7 occurrences — the letters C/A/G/E/D headers and the two "Open"/"Positioned {key}" labels). Also replace the three occurrences of the Material-only `deep-purple` color in the "D" section with the standard Tailwind `violet-800`:

- `text-deep-purple-700` → `text-violet-800`
- `stroke-deep-purple-700` → `stroke-violet-800`
- `fill-deep-purple-700` → `fill-violet-800`

The full corrected file:

```tsx
import type { JSX } from 'react';
import React from 'react';
import { useSettings } from '../../../hooks';
import { Diagram, DotText, FretNumberPosition } from '../../../common/fretboard';
import { CagedHook } from '../hooks';

const CagedContent = ({
  selectedKey,
  cagedChords,
  printRef,
  printStyle,
}: CagedHook): JSX.Element => {
  const { orientation } = useSettings();

  return (
    <div className="flex flex-initial flex-col items-center" id="caged-content" ref={printRef}>
      {cagedChords && (
        <div>
          <style type="text/css" media="print">
            {printStyle(orientation)}
          </style>
          <div className="flex flex-row" id="caged-C">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <p className="text-4xl font-extrabold text-blue-700">C</p>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <p className="text-2xl">{`Open`}</p>
              </div>
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.C.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <p className="text-2xl">{`Positioned ${selectedKey}`}</p>
              </div>
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.C.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-blue-700 fill-blue-700'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-A">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <p className="text-4xl font-extrabold text-red-700">A</p>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-a'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.A.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-a'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.A.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-red-700 fill-red-700'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-G">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <p className="text-4xl font-extrabold text-green-700">G</p>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.G.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-g'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.G.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-green-700 fill-green-700'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-E">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <p className="text-4xl font-extrabold text-orange-800">E</p>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.E.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-e'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.E.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-orange-800 fill-orange-800'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-D">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <p className="text-4xl font-extrabold text-violet-800">D</p>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-d'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.D.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-d'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.D.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-violet-800 fill-violet-800'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CagedContent;
```

- [ ] **Step 2: Read `src/modules/chord/components/ChordContent.tsx`, then apply this exact change**

Remove:
```tsx
import { Typography } from '@material-tailwind/react';
```

Replace:
```tsx
<Typography className="text-3xl pt-2">{`${chord.key} ${chord.suffix}`}</Typography>
```
with:
```tsx
<p className="text-3xl pt-2">{`${chord.key} ${chord.suffix}`}</p>
```

- [ ] **Step 3: Read `src/modules/scale/components/ScaleContent.tsx`, then apply this exact change**

Remove:
```tsx
import { Typography } from '@material-tailwind/react';
```

Replace:
```tsx
<Typography className="text-3xl pt-2">{`${selectedKey} ${scale}`}</Typography>
```
with:
```tsx
<p className="text-3xl pt-2">{`${selectedKey} ${scale}`}</p>
```

- [ ] **Step 4: Verify no remaining references to Material Tailwind anywhere in the codebase**

Run: `grep -rl "@material-tailwind/react" src/`

Expected: no output (empty). If any file is still listed, it was missed in Tasks 5-10 — go back and migrate it before proceeding.

- [ ] **Step 5: Commit**

```bash
git add src/modules/caged/components/CagedContent.tsx src/modules/chord/components/ChordContent.tsx src/modules/scale/components/ScaleContent.tsx
git commit -m "refactor: migrate CagedContent, ChordContent, ScaleContent from Material Tailwind to shadcn/ui

- replace Material-only deep-purple color with standard Tailwind violet-800"
```

---

## Task 11: Fix the `assert-ts` default-import bug exposed by this migration

**Files:**
- Modify: `src/common/fretboard/utils/diagram-style.ts`

With Material Tailwind removed, the app no longer crashes before the fretboard diagrams get a chance to render — which exposes a separate, pre-existing bug: `assert-ts`'s default export doesn't survive Vite's dependency optimizer in this project's Vite 8 setup, throwing `TypeError: assert is not a function` the moment any `<Diagram>` component renders (i.e. as soon as you select a chord, scale, or CAGED key). This was verified by completing this exact migration in a throwaway copy of the repo and observing the error in the browser console.

- [ ] **Step 1: Read `src/common/fretboard/utils/diagram-style.ts`, then apply this exact change to the import line**

```tsx
import { MouseEvent } from 'react';
import { assert } from 'assert-ts';
import { Orientation } from '../options';
```

(Only the `assert-ts` import line changes — from a default import `import assert from 'assert-ts';` to a named import `import { assert } from 'assert-ts';`. The rest of the file, including every call site of `assert(...)`, is unchanged since the named export has the same signature as the default export.)

- [ ] **Step 2: Verify the fix**

Run: `grep -n "^import" src/common/fretboard/utils/diagram-style.ts`

Expected: the `assert-ts` line reads `import { assert } from 'assert-ts';`.

- [ ] **Step 3: Verify in the browser**

With `npm start` running (restart it first with `rm -rf node_modules/.vite && npm start` to clear Vite's dependency cache, since it may have cached the broken pre-optimized bundle from before this fix), navigate to `http://localhost:3000/buddy-harmony/chord`, select a key (e.g. "E") and a chord type (e.g. "major"). Expected: four chord diagrams render below the toolbar, each showing a fretboard with numbered finger positions, string labels (E2/A2/D3/G3/B3/E4), and roman-numeral fret markers. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/common/fretboard/utils/diagram-style.ts
git commit -m "fix: use named import for assert-ts to fix broken default-export interop under Vite

- default import silently resolved to a non-function at runtime under
  this project's Vite/esbuild dependency optimizer, though it type-checked
  fine — this was masked by the unrelated Material Tailwind ThemeProvider
  crash until that crash was fixed"
```

---

## Task 12: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full build**

Run: `npm run build`

Expected: succeeds with no TypeScript errors. A bundle-size warning about the main chunk exceeding 500kB is expected and pre-existing (unrelated to this migration) — do not attempt to fix it as part of this plan.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: 0 errors. If there are warnings from the shadcn-generated files in `src/components/ui/`, run `npm run format` to auto-fix them, then re-run `npm run lint` to confirm 0 errors and 0 warnings remain.

- [ ] **Step 3: Run the test suite**

Run: `npm test`

Expected: all existing tests pass (no test files exist for any of the migrated components, so this run should show the same pass count as on `main` before this migration — confirm by comparing against `git stash` + `npm test` on unmigrated `main` if in doubt).

- [ ] **Step 4: Manual browser verification of every affected surface**

Run: `npm start`, open `http://localhost:3000/buddy-harmony/` in a browser, and check the browser console for errors at each step:

1. Root page (`/buddy-harmony/`): header and footer render, no console errors.
2. Click the hamburger menu icon: dropdown with page links appears.
3. Navigate to `/buddy-harmony/chord`: toolbar renders (gear icon, Key/Chord buttons, print icon).
4. Click the gear icon: settings dropdown opens with guitar-type submenu, disabled tuning select, layout submenu.
5. Click "Key", select any key: button updates, "Chord" button enables.
6. Click "Chord", select "major": chord diagrams render with fretboards.
7. Hover the print icon: tooltip appears.
8. Navigate to `/buddy-harmony/scale` and `/buddy-harmony/caged`: repeat steps 3-6 adapted to each page's toolbar, confirm diagrams render without console errors.
9. Hover a footer icon (GitHub/bug/Twitter/email): tooltip appears.

- [ ] **Step 5: Confirm no leftover references to removed packages**

Run: `grep -rn "material-tailwind" package.json`

Expected: no output.

Run: `grep -rn "@material-tailwind" src/`

Expected: no output.

---

## Out of scope — flag to the user after this plan ships

- The `LanguageSelector` infinite-loop bug documented in the Context section (Task list item 2). This is a real, pre-existing bug that this migration will expose in normal use (e.g. rapidly switching between chords/keys can trigger it via unrelated re-renders). It needs its own investigation and fix with test coverage — don't bundle it into this migration's commits.
- The `dist/assets/index-*.js` bundle-size warning (~2MB, ~514KB gzipped) surfaced by `npm run build` — pre-existing, unrelated to this migration.
- A pre-existing React "missing key prop" warning in `ChordShape` (`src/common/fretboard/components/ChordShape.tsx`) surfaced during manual verification — pre-existing, unrelated to this migration.
