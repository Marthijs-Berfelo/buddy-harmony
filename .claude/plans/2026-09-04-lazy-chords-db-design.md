# Lazy-load chords-db JSON to shrink the main bundle

## Problem

The production main bundle (`index.js`) is 1.91 MB (482 KB gzip) — well over Vite's 500 KB
chunk-size warning threshold. The largest identified contributor is
`@tombatossals/chords-db`'s `guitar.json` (236 KB) and `ukulele.json` (212 KB), which contain
full chord-position data (frets, fingers, MIDI notes) for every chord in every key.

`src/hooks/chord-db.ts` statically imports these JSON files. `src/hooks/constants.ts` only
needs their small `tunings` and `keys` fields to build `chordGuitarTypes` / `defaultGuitar` /
`standardTuning()` — but since JSON imports can't be partially tree-shaken, referencing any
field pulls in the entire file, including the ~450 KB of chord-position data.

`constants.ts` is reachable from `SettingsContextProvider`, which wraps `<Outlet/>` in
`Content.tsx` and therefore renders on every route — including the scale-only page, which
never needs chord data at all. This puts the chords-db payload on the eager, non-lazy path
for every page load, even though `use-guitar-chord.ts` (chord module) and `use-caged.ts`
(caged module) — the actual consumers of the full chord-position data — already sit behind
existing `lazy()` route boundaries.

## Goal

Move the chords-db JSON out of the eager `index.js` bundle and into a chunk that loads on
demand, without duplicating the ~450 KB payload across an eager "metadata" chunk and the
lazy chord/caged route chunks.

## Design

### 1. Data loading layer — `src/hooks/chord-db.ts`

Replace the static imports:

```ts
import instrumentsJson from '@tombatossals/chords-db/lib/instruments.json';
import guitarJson from '@tombatossals/chords-db/lib/guitar.json';
import ukuleleJson from '@tombatossals/chords-db/lib/ukulele.json';
```

with a memoized dynamic loader:

```ts
let cache: Promise<ChordDb> | undefined;

export const loadChordDb = (): Promise<ChordDb> => {
  cache ??= Promise.all([
    import('@tombatossals/chords-db/lib/guitar.json'),
    import('@tombatossals/chords-db/lib/ukulele.json'),
    import('@tombatossals/chords-db/lib/instruments.json'),
  ]).then(([guitarModule, ukuleleModule, instrumentsModule]) => {
    guitar = guitarModule.default;
    ukulele = ukuleleModule.default;
    instruments = instrumentsModule.default;
    return { guitar, ukulele, instruments };
  });
  return cache;
};
```

`guitar`, `ukulele`, `instruments` become module-level variables populated once `loadChordDb()`
resolves, instead of import-time constants. All existing exported functions —
`chordTuning`, `chordsForKey`, `chordModels`, `chordNamesForKey`, `handleSelectionForChords`,
`getInstrument` — stay **synchronous** with unchanged signatures. This is safe because every
call site is guaranteed to run only after `loadChordDb()` has resolved (see section 3).

Vite/Rollup will automatically code-split the three dynamic `import()` calls into a separate
chunk (bundler-assigned name, e.g. `chords-db-*.js`), fetched once and cached for the session
via the memoized promise — regardless of how many times `loadChordDb()` is called.

### 2. Constants layer — `src/hooks/constants.ts`

`chordGuitarTypes`, `guitarTypes`, `commonGuitarTypes()`, `defaultGuitar`, `standardTuning()`
currently compute eagerly at module-import time from `instruments` / `chordTuning()`. These
become part of a `computeGuitarTypes()` function, invoked once after `loadChordDb()` resolves,
returning `{ chordGuitarTypes, guitarTypes, defaultGuitar, standardTuning }`.

`scaleGuitarTypes` (hardcoded tunings, no chords-db dependency) and `keys` (currently sourced
from `guitar.keys`, but a static, small value) stay as direct exports — `keys` gets hardcoded
as a local constant since it doesn't change and doesn't justify the async dependency.

`extractTuning` stays a pure, synchronous, exported utility (used by both the async result and
by `SettingsContextProvider` directly).

### 3. Settings provider — `src/hooks/settings/SettingsContextProvider.tsx`

Add an internal loading gate:

```tsx
const SettingsContextProvider = (props: PropsWithChildren<Props>): JSX.Element => {
  const [guitarTypesData, setGuitarTypesData] = useState<GuitarTypesData>();

  useEffect(() => {
    loadChordDb()
      .then(() => setGuitarTypesData(computeGuitarTypes()))
      .catch((err) => console.error('Failed to load chord data:', err));
  }, []);

  if (!guitarTypesData) {
    return <>Loading..</>;
  }

  return <SettingsContextProviderInner {...props} guitarTypesData={guitarTypesData} />;
};
```

The existing provider body (state for `guitarType`, `tuningType`, `leftHanded`, `orientation`,
`fretNumbers`, the `Settings` context value, etc.) moves into `SettingsContextProviderInner`,
which only ever mounts once `guitarTypesData` is populated. `guitarType` / `tuningType` in the
exposed `Settings` context stay **non-nullable**, matching current consumer expectations in
`Diagram`, `Fretboard`, `ChordShape`, toolbars, etc. — no downstream type changes.

On load failure: `console.error` and no state update, so the gate never opens and the user
stays on `'Loading..'` indefinitely. Matches the existing `translations.tsx` pattern
(`.catch((err) => console.error(...))`); no new error-boundary abstraction is introduced.

### 4. Consumers behind lazy routes — no changes needed

`use-guitar-chord.ts`, `use-caged.ts`, `caged-utils.ts` all call `useSettings()`, which means
they only run after `SettingsContextProviderInner` has mounted — i.e., after `loadChordDb()`
has already resolved. Their calls to `chordsForKey`, `chordModels`, `chordNamesForKey`,
`handleSelectionForChords` stay synchronous and require **zero code changes**.

### 5. Testing

- `chord-db.spec.ts`: `await loadChordDb()` before asserting on `chordTuning` / `chordsForKey`
  / etc. (mirrors real call order). Add a test asserting concurrent `loadChordDb()` calls
  return the same cached promise (no duplicate fetches).
- `constants.spec.ts`: wrap existing assertions in `await computeGuitarTypes()` (or equivalent
  setup); same assertions as today, just after an await.
- `SettingsContextProvider`: new test file — renders `'Loading..'` before `loadChordDb()`
  resolves, then renders children with populated `guitarType`/`tuningType` after resolution.
  Mock the chords-db dynamic imports via `vi.mock('@tombatossals/chords-db/lib/guitar.json', ...)`.

### 6. Expected bundle outcome

- `index.js` (eager, all routes): no longer contains `guitar.json` / `ukulele.json` chord
  position data. Only small settings/keys logic and the loader stub remain.
- New chunk (bundler-named, e.g. `chords-db-*.js`): contains `guitar.json` + `ukulele.json` +
  `instruments.json`, fetched once when `SettingsContextProvider` first mounts (every route
  renders it), cached in memory for the session.
- Net effect: ~450 KB of chord data moves from "blocking the initial `index.js` parse/eval on
  every page load" to "fetched once, right after initial paint, in parallel with the lazy
  route chunk" — still loaded on every visit (every route needs settings), but no longer
  bloating the critical path bundle, and not duplicated across chunks.

## Out of scope

- Splitting `ukulele.json` from `guitar.json` so only the selected instrument's data loads
  (both are needed for `commonGuitarTypes()` / `guitarTypes` regardless of current selection).
- A dedicated error-boundary / retry UI for failed chunk loads — no such abstraction exists
  elsewhere in the app; this change doesn't introduce one.
- The `LanguageSelector` lazy-loading and hook-extraction (already implemented separately in
  this session, prior to this design).
