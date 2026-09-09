# Changelog

## [0.15.0](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.14.0...0.15.0) (2026-09-09)

### Features

* add compile-time type safety for translation keys ([d979d6c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d979d6ccc83e06f77712cd078e8cc73906f9caa6))

### Bug Fixes

* correct locale key mismatches and add en/nl parity test ([89fef18](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/89fef18cb2d0508b9aad6b3a6a3874fb3c8883fa))
* resolve vite.config.ts type error for the test option ([cf36e4a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/cf36e4aa88761955bc4abff8ac42ddf7fece07e2))

### Performance Improvements

* memoize settings context value and callbacks ([e830b43](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e830b4379e745cf29ac551bc43a8e784c9143f1b))

### Code Refactoring

* convert module hooks to context providers to remove prop forwarding ([95565b0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/95565b04594bed1f67bca231956a142513381564))
* convert remaining default exports to named exports and enforce kebab-case filenames ([bfbf5b4](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/bfbf5b4b54d4c31f409fd67d501d544d5464c9e7))
* dissolve common/ folder into components, layout, routing, and lib ([dd0357f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd0357fbaca27dbe69f0008e979682c763941370))
* export caged-utils helpers directly instead of via test_export ([8fcbb45](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8fcbb4529b8ec6219d93b95560dc67e7791a56ce))
* merge feature module hooks into their context providers ([f72833b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f72833bdbeb5edda08f4df29c846b21c1b9240b6))
* use dedicated common/hooks/modules aliases consistently ([36b31d1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/36b31d196f9c04f881819c08bc95addc57a1fb30))

### Dependency Updates

* bump i18next in the i18next group across 1 directory ([750b3ea](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/750b3ea0d1a553d5ad474a3fd6a4c964ae578662))
* bump lucide-react from 1.39.0 to 1.40.0 ([27a1888](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/27a18882c0ef24880d76e47828685061af12069d))

### Miscellaneous Chores

* remove dead code and unused assets ([8ac8405](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8ac8405103455300da217be13bb6d6eeb823eaed))

### Documentation

* document kebab-case filenames, named-exports, and provider pattern ([f1a1907](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f1a19075f2db9f9cd2626c43e8bbe82dd428a2be))

## [0.14.0](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.13.1...0.14.0) (2026-09-08)

### Features

* **611:** label language dropdown options for screen readers ([d6e3cb2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d6e3cb2d0e0a5efa1059766903e169f5226a2727))

### Bug Fixes

* **611:** re-label dropdown options when the active language changes ([2220251](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2220251a61ffa9ea3dab0e93079badce2ce8178e))

## [0.13.1](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.13.0...0.13.1) (2026-09-08)

### Bug Fixes

* **618:** correct historical changelog compare links to their true predecessor ([868e899](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/868e8997892d86d2fd0ce5d721358529fd75a960))
* **618:** re-tag release commit on main after rebase-merge ([e01a44f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e01a44fa546317535f1ef242c5a38c772b7b158f))
* show Suspense fallback during router navigations ([2af23f9](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2af23f95997ccfe6e7300e65ce156c7a07355477))

### Code Refactoring

* merge App.css and Page.css into index.css ([d21be77](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d21be7716d0384a93a506677a14924506f44dde3))

## [0.13.0](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.12.0...0.13.0) (2026-09-08)

### Features

* add FretboardDotsLoader for route-chunk Suspense fallback ([0e5ec83](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0e5ec83f906c3e4db27417666fcf8bde9585bde0))
* add minimum display delay for NoteWaveLoader, fix build warnings ([b0347d5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b0347d5b496f530073a4a26c044de03bb2c2aa8d))
* add minimum display delay for route-chunk loading ([b7e6b7a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b7e6b7ae934a37bff177df239db25da4cc2c3f26))
* add NoteWaveLoader for button-level chord-db loading state ([b49dc3c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b49dc3c30d961298a37487c6606e60bd2501c2b2))
* gate SettingsContextProvider on async chord metadata loading ([cd8aa9d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/cd8aa9d214b21f22e3136f9d51e4f1dbaaeda7df))
* report coverage from a trusted workflow_run job ([910b5d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/910b5d0a54220d28519cfc7696205ce66ba77f0c))
* show NoteWaveLoader in ChordSelector while chord data loads ([98cac1d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/98cac1dc6e9cd21bf52b1a04dbd9cc46213d7f8c))
* show NoteWaveLoader in KeySelector while chord data loads ([7526cb9](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7526cb94be313e04246c8c9dffaa7234517855a8))
* use FretboardDotsLoader as the route-chunk Suspense fallback ([8b2c3d3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8b2c3d34d0d7881c30ac1a40b3d87479616707d5))

### Bug Fixes

* **402:** scope QA coverage comment to PRs, repair badge trigger ([5a4ed8a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5a4ed8a933b314fab46f6becd49a5a7606d1ad01))
* **a11y:** name icon-only controls ([9a3f21f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9a3f21ff73f995f93f8b72e144b4f3e8412e238f))
* add Dependency Updates changelog section, un-hide chore and refactor, hide deps-ci ([00d61ef](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/00d61ef6bf6e29ff1cf9e4e2a6f52fe09ae5707e))
* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* address PR review nits on release-debounce workflow ([24c3244](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/24c32443056b10184362ba772f3057ae24b13dd5))
* allow hyphenated commit types in commitlint header pattern ([d9acb58](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d9acb584da5931f4156351c6bb813c86d4de8945))
* check out fork PRs safely by triggering Build PR on pull_request ([1987208](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1987208a9084424b712a681bbbc524de4db39b29)), references [#599](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/599)
* clarify upstream main branch belongs to buddy-harmony, not the fork ([7882df1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882df1d651a4eb2f8813f7bc7151f97bd4becea))
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* disable body-max-line-length to unblock Dependabot commit lint ([1172aa7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1172aa73ee3bb3927e3d292386c2e1e660520006))
* don't fail Coverage Reporter when upstream build was all-skipped ([5826418](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5826418708333c516da1385668f0881d939fd616))
* extend dependabot ignore rules to prevent peer-dependency breaks ([5d16567](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5d16567d3530b2a19f87359f877029d8d1305c88)), references [#555](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/555) [#575](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/575)
* give Dependabot commits distinct deps/deps-dev/deps-ci conventional-commit types ([1dccffb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1dccffbfaa2f5a47f90cd84a63064ea3b88fa7a9))
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), references [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json to match CI's npm version ([2ae0d9e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2ae0d9ecd6424644e0e16eabb8771a9aa13ac106))
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove unsupported pull_request_review_thread trigger ([5efcef2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5efcef261c84a4c5150317b23c4b4af42f796496))
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* resolve react-hooks lint violations in LanguageSelector ([2c347cf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2c347cf924c4f13a912bb44bf5e2181967cff408))
* resolve remaining react-hooks lint violations ([246f220](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/246f2202f8c1a65f20748710317e9c0d0ab52bff))
* restore feature alias in changelog types for parity with upstream default ([37727ce](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/37727ce2d819cd774e69f7c11f7d5bcd96a9d9bc))
* restore missing imports in LanguageSelector ([260201b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/260201b5f2a090243b6396ce12ef4a803b72096d))
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* revert update coverage badge authentication ([76f9871](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/76f9871ea282ef400ef74783cb2124fc2e9f5a41))
* skip release when other PRs are open against main, or the last commit is itself a release ([b5bf841](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b5bf841c215c2a0610df5353957db2ccca3ffc05))
* stop posting PR coverage comment directly from job.test.yaml ([ff754fc](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff754fc85af85b9874e9d8489eff7240b8d32996))
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* update coverage badge authentication ([573b25b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/573b25bd1d20359efea3ce9627b24b01bee14f2d))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* wrap isSupportedType in useCallback to satisfy exhaustive-deps ([b59ce7d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b59ce7d31717e27e4481c81b5d5a4720f3753c58))

### Code Refactoring

* document lazy-initializer workaround in SettingsContextProvider ([6393c4d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6393c4d2d09e4b9c87c82d43e048340454fe93aa))
* lazy-load LanguageSelector and extract useLanguage hook ([ac6a6e9](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ac6a6e93d985f596f700cd4beef1b50f6f302e91))
* lazy-load route pages and adopt @/ import alias ([d0f44fe](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d0f44fe129cae6f27be9304c0596ba44fda0ad53))
* load chords-db JSON via a memoized dynamic import ([f057287](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f05728723a00f14e1720d9003cbbeae0333c6df8))
* make chordGuitarTypes/defaultGuitar/standardTuning async ([e79f269](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e79f2690be0a7e97abc746ae137a873a6a72268e))
* migrate CagedContent, ChordContent, ScaleContent from Material Tailwind to shadcn/ui ([38cb2d5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/38cb2d57bbd9bdaff4e35290cb343c0da29e18fc)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate ChordSelector, KeySelector, ScaleSelector from Material Tailwind to shadcn/ui ([0968af7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0968af70f19e8fc187d1236c531ef7c505fd5341)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Header and Footer from Material Tailwind to shadcn/ui ([e1cae0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e1cae0e24cac14bfe865f70c3b596176ecec8e98)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate SettingsTools from Material Tailwind to shadcn/ui ([a02d8bf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/a02d8bf8d3835204abdf22ebcab07dba8d0d4f7a)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Toolbar from Material Tailwind to shadcn/ui ([0c112e5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0c112e59470594ad0f1d897383fc7833bbe54a70)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove full-page chord-db gate, add chordDataLoading flag ([c2a37c2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c2a37c28311daf9cf49ce01dd6060a30b7be0537))
* source chordGuitarTypes from settings context ([a7fac37](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/a7fac37b22d7d179c035f5cd4901d17bad3f2b75))
* use Tailwind classes and co-located CSS for loader animations ([ab7f7b4](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ab7f7b4eba0f9448fbc118e5f9708145bd0c48f9))

### Dependency Updates

* bump i18next-http-backend from 4.0.1 to 4.0.2 in the i18next group ([88f140f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/88f140f21a9e750406c082d29c396cab8cdd3f20))
* bump immutable from 5.1.5 to 5.1.9 ([c01e4cb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c01e4cbe4d076e08c5884503a37ba442a6ea36ec))
* bump lodash and commitizen ([3a42a32](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3a42a32ab6f891913272d5febbf49cc486c49ff6))
* bump lucide-react from 1.37.0 to 1.39.0 ([5bcc86d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5bcc86d6a21321f446fbafa246c6219f1b39deb3))
* bump qs from 6.15.3 to 6.16.0 ([af9d13d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/af9d13d366e7ccfe9d793a2f4b357c4f8860f0d9))
* bump shadcn from 4.19.0 to 4.20.1 ([23c831e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/23c831e2be64591d05e84034cddbfd2feddc83b2))
* bump the fortawesome group across 1 directory with 6 updates ([1253ed5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1253ed5616546273042ebb20b1ef57bdfc9417ff))
* bump the i18next group across 1 directory with 2 updates ([88c4b4d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/88c4b4d27c0aa175a4b0a983530e9dca731fd034))
* bump the react group across 1 directory with 2 updates ([1491969](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1491969766106a5ab23dcdd20e244b6210394cff))
* bump web-vitals from 4.2.4 to 6.1.1 ([60b4e19](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/60b4e191545b09b688df8df2c36d191a375636e3))
* bump web-vitals from 6.1.1 to 6.2.1 ([5dfafcb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5dfafcb648e6122a327865c4b36d2041cf074dcd))

### Miscellaneous Chores

* **556:** move implementation plans to gitignored .claude/plans/ ([3cd82eb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3cd82ebf497c823958b5faccb3ba52b4d11bde99))
* **deps-dev:** bump brace-expansion from 1.1.14 to 1.1.18 ([dd074af](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd074af32e1309323fa96c255950732859e7e7db))
* **deps:** bump dependabot/fetch-metadata from 2 to 3 ([#506](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/506)) ([1d3f342](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d3f3420615d6573b0107fb5013062e9b43f85b3))
* **deps:** bump fast-uri from 3.1.2 to 3.1.6 ([41ad1fb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/41ad1fb9a9c3f1cc6d8fb9b0a92073b79c5b806b))
* **deps:** bump ip-address from 10.2.0 to 10.7.0 ([3559105](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3559105548b77e89a14721d29e7f2023265d20b8))
* **deps:** bump JamesIves/github-pages-deploy-action ([2346f42](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2346f42131d4e262667d44fa979de9d4f0263bac))
* **deps:** bump js-yaml from 4.1.1 to 4.3.2 ([458ab15](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/458ab15be5e49dba57bd19c48b018cc821134213))
* **deps:** bump MishaKav/jest-coverage-comment from 1.0.33 to 1.0.36 ([ff75dea](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff75deaedfc3aad345cb9783ab7ad8472c2b9f8b))
* **deps:** bump postcss from 8.5.14 to 8.5.26 ([46b64f1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46b64f1a37d00af309fc0a03d458ab013847717e))
* **deps:** bump react-router and react-router-dom ([4940ecb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/4940ecb3304be7894ac02b4ec3fc6313da618008))
* **deps:** bump the i18next group across 1 directory with 3 updates ([50e45ac](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/50e45acc48faa970ae94c0929424ac959a894878))
* drop unused COVERAGE_COMMENT secret from Build MAIN's QA call ([12fd4bc](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/12fd4bc7765067950fbd8a1c4914af79eedd6496))
* group release-it and @release-it/* dependabot updates ([82dc67b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/82dc67b09a46ba80ca0975b9ec03451eb63d4b6f))
* initialize shadcn/ui and add button, dropdown-menu, tooltip, select components ([5492550](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5492550956c12833fc68e7b9d18e28aae0cdb68f)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* release v0.11.10 ([b41898f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b41898f76321808b93bbcdf3b8f95d3a4f76b082))
* release v0.11.11 ([ace11f8](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ace11f8ae3c0e580be768d225804fc963dc80127))
* release v0.11.12 ([be22465](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/be22465fe50d099607e68efd161c44c427fa1c4f))
* release v0.11.13 ([9cad8a5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9cad8a5972860089e2cd2f75869088ad17cbc4af))
* release v0.11.14 ([98b8b08](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/98b8b08f011dfb3cf5d23abf75e6930025e6d8cf))
* release v0.11.15 ([6f105f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6f105f78819bb23067add134b78c2158984a9d23))
* release v0.11.16 ([6e30d89](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6e30d89b408c3d57493b778fe88989151fd876da))
* release v0.11.17 ([9a6fea3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9a6fea34db91d535b9d4e255d19c130704da3d61))
* release v0.11.18 ([882920c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/882920c90af52d4c90f2c85484bb5a70b7f2d5e7))
* release v0.11.5 ([c668e1e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c668e1e58389ab4f3663daaa5d8c4215f4b67cb9))
* release v0.11.6 ([8bb720c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8bb720c56649272206af3a6b361e1a2ccdb0c5a4))
* release v0.11.7 ([9335bdb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9335bdbc1f3b04b73f5c29c8dcf08e49b8ecd0bd))
* release v0.11.8 ([7882570](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882570c52ec28f2d2f0eb1e0f6018a330aa6006))
* release v0.11.9 ([1627797](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/16277979376e117485fda736a23213dfa3369280))
* release v0.12.0 ([13351de](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/13351ded16783fffec4475c0fe55338640021f02))
* remove @material-tailwind/react and Tailwind v3 postcss config ([6987769](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/698776962bcd402b3da64da64a5e6d50edc88d55)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead use-breakpoint hook (relied on removed Tailwind v3 JS config API) ([6b9ff2c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6b9ff2c216e0f4121683cd3003ae27e90c65dad6)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* shorten dependabot.yml header comment ([5668121](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5668121da222d3ba229dae020dfeccdb575cd292))
* upgrade Tailwind CSS v3 to v4 ([ad845b0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ad845b02fbde13861cedddb019aa2704de0fff71)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Continuous Integration

* add GitHub App auto-approver with Copilot review gate ([#514](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/514)) ([1d828ad](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d828adf8ce14bbd0704c2e15c1510f2704a1eaa))
* enforce Conventional Commits format on every PR commit ([fe44402](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/fe4440267f1af3b8342a574ff3c59c640c7886c1))

### Documentation

* **556:** add shadcn migration plan ([bbe9ff3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/bbe9ff33649d40fa3dd59c9055538b2be45b0071)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* document Tailwind-over-inline-styles convention, ignore .superpowers/ ([e084409](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e084409b6b7dab25ce3dd7cea5b92533fb7b71d1))

### Styles

* apply project prettier formatting to shadcn-generated components ([55c480a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/55c480a3f6d4ae38c2b843b7cb36ccf46f668773)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* require braces on all if statements ([0d24a45](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0d24a45e8f11538feee8e42df084bd2b468fe47a))

### Tests

* assert keys against loaded chords-db instead of a literal copy ([bc8fa05](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/bc8fa0548ca71ebde3207e62cff90d413a933ce5))
* cover pure logic in hooks and fretboard utils ([71af8fd](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/71af8fdfcb17ca76ef0ea59f63c863afe1046793))
* lock in useCaged's existing safety during chord-db loading ([19b114b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/19b114b22f6debe8743ceda3f87eb1262491f227))
* lock in useGuitarChord's existing safety during chord-db loading ([7229e82](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7229e8222c5fa2aee635ffc8ca63102b3df549f4))

### Build System

* add typecheck script and wire it into the QA pipeline ([ef1914f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ef1914fa3ac70ff23bd92d51e710a0475f1b86f1))
* use import.meta.dirname instead of __dirname in vite config ([e968622](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968622c9d5fe14c788923b1ff622e003ab18454))

## [0.12.0](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.18...0.12.0) (2026-09-07)

### Features

* report coverage from a trusted workflow_run job ([910b5d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/910b5d0a54220d28519cfc7696205ce66ba77f0c))

### Bug Fixes

* **402:** scope QA coverage comment to PRs, repair badge trigger ([5a4ed8a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5a4ed8a933b314fab46f6becd49a5a7606d1ad01))
* **a11y:** name icon-only controls ([9a3f21f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9a3f21ff73f995f93f8b72e144b4f3e8412e238f))
* add Dependency Updates changelog section, un-hide chore and refactor, hide deps-ci ([00d61ef](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/00d61ef6bf6e29ff1cf9e4e2a6f52fe09ae5707e))
* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* address PR review nits on release-debounce workflow ([24c3244](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/24c32443056b10184362ba772f3057ae24b13dd5))
* allow hyphenated commit types in commitlint header pattern ([d9acb58](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d9acb584da5931f4156351c6bb813c86d4de8945))
* check out fork PRs safely by triggering Build PR on pull_request ([1987208](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1987208a9084424b712a681bbbc524de4db39b29)), references [#599](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/599)
* clarify upstream main branch belongs to buddy-harmony, not the fork ([7882df1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882df1d651a4eb2f8813f7bc7151f97bd4becea))
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* disable body-max-line-length to unblock Dependabot commit lint ([1172aa7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1172aa73ee3bb3927e3d292386c2e1e660520006))
* don't fail Coverage Reporter when upstream build was all-skipped ([5826418](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5826418708333c516da1385668f0881d939fd616))
* extend dependabot ignore rules to prevent peer-dependency breaks ([5d16567](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5d16567d3530b2a19f87359f877029d8d1305c88)), references [#555](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/555) [#575](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/575)
* give Dependabot commits distinct deps/deps-dev/deps-ci conventional-commit types ([1dccffb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1dccffbfaa2f5a47f90cd84a63064ea3b88fa7a9))
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), references [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json to match CI's npm version ([2ae0d9e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2ae0d9ecd6424644e0e16eabb8771a9aa13ac106))
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove unsupported pull_request_review_thread trigger ([5efcef2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5efcef261c84a4c5150317b23c4b4af42f796496))
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* resolve react-hooks lint violations in LanguageSelector ([2c347cf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2c347cf924c4f13a912bb44bf5e2181967cff408))
* resolve remaining react-hooks lint violations ([246f220](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/246f2202f8c1a65f20748710317e9c0d0ab52bff))
* restore feature alias in changelog types for parity with upstream default ([37727ce](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/37727ce2d819cd774e69f7c11f7d5bcd96a9d9bc))
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* revert update coverage badge authentication ([76f9871](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/76f9871ea282ef400ef74783cb2124fc2e9f5a41))
* skip release when other PRs are open against main, or the last commit is itself a release ([b5bf841](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b5bf841c215c2a0610df5353957db2ccca3ffc05))
* stop posting PR coverage comment directly from job.test.yaml ([ff754fc](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff754fc85af85b9874e9d8489eff7240b8d32996))
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* update coverage badge authentication ([573b25b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/573b25bd1d20359efea3ce9627b24b01bee14f2d))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Code Refactoring

* migrate CagedContent, ChordContent, ScaleContent from Material Tailwind to shadcn/ui ([38cb2d5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/38cb2d57bbd9bdaff4e35290cb343c0da29e18fc)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate ChordSelector, KeySelector, ScaleSelector from Material Tailwind to shadcn/ui ([0968af7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0968af70f19e8fc187d1236c531ef7c505fd5341)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Header and Footer from Material Tailwind to shadcn/ui ([e1cae0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e1cae0e24cac14bfe865f70c3b596176ecec8e98)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate SettingsTools from Material Tailwind to shadcn/ui ([a02d8bf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/a02d8bf8d3835204abdf22ebcab07dba8d0d4f7a)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Toolbar from Material Tailwind to shadcn/ui ([0c112e5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0c112e59470594ad0f1d897383fc7833bbe54a70)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Dependency Updates

* bump immutable from 5.1.5 to 5.1.9 ([c01e4cb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c01e4cbe4d076e08c5884503a37ba442a6ea36ec))
* bump lodash and commitizen ([3a42a32](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3a42a32ab6f891913272d5febbf49cc486c49ff6))
* bump qs from 6.15.3 to 6.16.0 ([af9d13d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/af9d13d366e7ccfe9d793a2f4b357c4f8860f0d9))
* bump the fortawesome group across 1 directory with 6 updates ([1253ed5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1253ed5616546273042ebb20b1ef57bdfc9417ff))
* bump the i18next group across 1 directory with 2 updates ([88c4b4d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/88c4b4d27c0aa175a4b0a983530e9dca731fd034))
* bump the react group across 1 directory with 2 updates ([1491969](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1491969766106a5ab23dcdd20e244b6210394cff))
* bump web-vitals from 4.2.4 to 6.1.1 ([60b4e19](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/60b4e191545b09b688df8df2c36d191a375636e3))
* bump web-vitals from 6.1.1 to 6.2.1 ([5dfafcb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5dfafcb648e6122a327865c4b36d2041cf074dcd))

### Miscellaneous Chores

* **556:** move implementation plans to gitignored .claude/plans/ ([3cd82eb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3cd82ebf497c823958b5faccb3ba52b4d11bde99))
* **deps-dev:** bump brace-expansion from 1.1.14 to 1.1.18 ([dd074af](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd074af32e1309323fa96c255950732859e7e7db))
* **deps:** bump dependabot/fetch-metadata from 2 to 3 ([#506](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/506)) ([1d3f342](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d3f3420615d6573b0107fb5013062e9b43f85b3))
* **deps:** bump fast-uri from 3.1.2 to 3.1.6 ([41ad1fb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/41ad1fb9a9c3f1cc6d8fb9b0a92073b79c5b806b))
* **deps:** bump ip-address from 10.2.0 to 10.7.0 ([3559105](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3559105548b77e89a14721d29e7f2023265d20b8))
* **deps:** bump JamesIves/github-pages-deploy-action ([2346f42](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2346f42131d4e262667d44fa979de9d4f0263bac))
* **deps:** bump js-yaml from 4.1.1 to 4.3.2 ([458ab15](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/458ab15be5e49dba57bd19c48b018cc821134213))
* **deps:** bump MishaKav/jest-coverage-comment from 1.0.33 to 1.0.36 ([ff75dea](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff75deaedfc3aad345cb9783ab7ad8472c2b9f8b))
* **deps:** bump postcss from 8.5.14 to 8.5.26 ([46b64f1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46b64f1a37d00af309fc0a03d458ab013847717e))
* **deps:** bump react-router and react-router-dom ([4940ecb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/4940ecb3304be7894ac02b4ec3fc6313da618008))
* **deps:** bump the i18next group across 1 directory with 3 updates ([50e45ac](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/50e45acc48faa970ae94c0929424ac959a894878))
* drop unused COVERAGE_COMMENT secret from Build MAIN's QA call ([12fd4bc](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/12fd4bc7765067950fbd8a1c4914af79eedd6496))
* group release-it and @release-it/* dependabot updates ([82dc67b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/82dc67b09a46ba80ca0975b9ec03451eb63d4b6f))
* initialize shadcn/ui and add button, dropdown-menu, tooltip, select components ([5492550](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5492550956c12833fc68e7b9d18e28aae0cdb68f)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* release v0.11.10 ([b41898f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b41898f76321808b93bbcdf3b8f95d3a4f76b082))
* release v0.11.11 ([ace11f8](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ace11f8ae3c0e580be768d225804fc963dc80127))
* release v0.11.12 ([be22465](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/be22465fe50d099607e68efd161c44c427fa1c4f))
* release v0.11.13 ([9cad8a5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9cad8a5972860089e2cd2f75869088ad17cbc4af))
* release v0.11.14 ([98b8b08](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/98b8b08f011dfb3cf5d23abf75e6930025e6d8cf))
* release v0.11.15 ([6f105f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6f105f78819bb23067add134b78c2158984a9d23))
* release v0.11.16 ([6e30d89](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6e30d89b408c3d57493b778fe88989151fd876da))
* release v0.11.17 ([9a6fea3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9a6fea34db91d535b9d4e255d19c130704da3d61))
* release v0.11.18 ([882920c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/882920c90af52d4c90f2c85484bb5a70b7f2d5e7))
* release v0.11.5 ([c668e1e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c668e1e58389ab4f3663daaa5d8c4215f4b67cb9))
* release v0.11.6 ([8bb720c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8bb720c56649272206af3a6b361e1a2ccdb0c5a4))
* release v0.11.7 ([9335bdb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9335bdbc1f3b04b73f5c29c8dcf08e49b8ecd0bd))
* release v0.11.8 ([7882570](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882570c52ec28f2d2f0eb1e0f6018a330aa6006))
* release v0.11.9 ([1627797](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/16277979376e117485fda736a23213dfa3369280))
* remove @material-tailwind/react and Tailwind v3 postcss config ([6987769](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/698776962bcd402b3da64da64a5e6d50edc88d55)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead use-breakpoint hook (relied on removed Tailwind v3 JS config API) ([6b9ff2c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6b9ff2c216e0f4121683cd3003ae27e90c65dad6)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* shorten dependabot.yml header comment ([5668121](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5668121da222d3ba229dae020dfeccdb575cd292))
* upgrade Tailwind CSS v3 to v4 ([ad845b0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ad845b02fbde13861cedddb019aa2704de0fff71)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Continuous Integration

* add GitHub App auto-approver with Copilot review gate ([#514](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/514)) ([1d828ad](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d828adf8ce14bbd0704c2e15c1510f2704a1eaa))
* enforce Conventional Commits format on every PR commit ([fe44402](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/fe4440267f1af3b8342a574ff3c59c640c7886c1))

### Documentation

* **556:** add shadcn migration plan ([bbe9ff3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/bbe9ff33649d40fa3dd59c9055538b2be45b0071)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Styles

* apply project prettier formatting to shadcn-generated components ([55c480a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/55c480a3f6d4ae38c2b843b7cb36ccf46f668773)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* require braces on all if statements ([0d24a45](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0d24a45e8f11538feee8e42df084bd2b468fe47a))

### Tests

* cover pure logic in hooks and fretboard utils ([71af8fd](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/71af8fdfcb17ca76ef0ea59f63c863afe1046793))

### Build System

* add typecheck script and wire it into the QA pipeline ([ef1914f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ef1914fa3ac70ff23bd92d51e710a0475f1b86f1))
* use import.meta.dirname instead of __dirname in vite config ([e968622](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968622c9d5fe14c788923b1ff622e003ab18454))

## [0.11.18](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.17...0.11.18) (2026-09-01)

### Bug Fixes

* **402:** scope QA coverage comment to PRs, repair badge trigger ([5a4ed8a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5a4ed8a933b314fab46f6becd49a5a7606d1ad01))
* add Dependency Updates changelog section, un-hide chore and refactor, hide deps-ci ([00d61ef](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/00d61ef6bf6e29ff1cf9e4e2a6f52fe09ae5707e))
* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* address PR review nits on release-debounce workflow ([24c3244](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/24c32443056b10184362ba772f3057ae24b13dd5))
* allow hyphenated commit types in commitlint header pattern ([d9acb58](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d9acb584da5931f4156351c6bb813c86d4de8945))
* clarify upstream main branch belongs to buddy-harmony, not the fork ([7882df1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882df1d651a4eb2f8813f7bc7151f97bd4becea))
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* disable body-max-line-length to unblock Dependabot commit lint ([1172aa7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1172aa73ee3bb3927e3d292386c2e1e660520006))
* extend dependabot ignore rules to prevent peer-dependency breaks ([5d16567](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5d16567d3530b2a19f87359f877029d8d1305c88)), references [#555](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/555) [#575](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/575)
* give Dependabot commits distinct deps/deps-dev/deps-ci conventional-commit types ([1dccffb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1dccffbfaa2f5a47f90cd84a63064ea3b88fa7a9))
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), references [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json to match CI's npm version ([2ae0d9e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2ae0d9ecd6424644e0e16eabb8771a9aa13ac106))
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* resolve react-hooks lint violations in LanguageSelector ([2c347cf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2c347cf924c4f13a912bb44bf5e2181967cff408))
* resolve remaining react-hooks lint violations ([246f220](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/246f2202f8c1a65f20748710317e9c0d0ab52bff))
* restore feature alias in changelog types for parity with upstream default ([37727ce](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/37727ce2d819cd774e69f7c11f7d5bcd96a9d9bc))
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* revert update coverage badge authentication ([76f9871](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/76f9871ea282ef400ef74783cb2124fc2e9f5a41))
* skip release when other PRs are open against main, or the last commit is itself a release ([b5bf841](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b5bf841c215c2a0610df5353957db2ccca3ffc05))
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* update coverage badge authentication ([573b25b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/573b25bd1d20359efea3ce9627b24b01bee14f2d))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Code Refactoring

* migrate CagedContent, ChordContent, ScaleContent from Material Tailwind to shadcn/ui ([38cb2d5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/38cb2d57bbd9bdaff4e35290cb343c0da29e18fc)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate ChordSelector, KeySelector, ScaleSelector from Material Tailwind to shadcn/ui ([0968af7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0968af70f19e8fc187d1236c531ef7c505fd5341)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Header and Footer from Material Tailwind to shadcn/ui ([e1cae0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e1cae0e24cac14bfe865f70c3b596176ecec8e98)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate SettingsTools from Material Tailwind to shadcn/ui ([a02d8bf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/a02d8bf8d3835204abdf22ebcab07dba8d0d4f7a)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Toolbar from Material Tailwind to shadcn/ui ([0c112e5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0c112e59470594ad0f1d897383fc7833bbe54a70)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Dependency Updates

* bump immutable from 5.1.5 to 5.1.9 ([c01e4cb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c01e4cbe4d076e08c5884503a37ba442a6ea36ec))
* bump lodash and commitizen ([3a42a32](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3a42a32ab6f891913272d5febbf49cc486c49ff6))
* bump the fortawesome group across 1 directory with 6 updates ([1253ed5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1253ed5616546273042ebb20b1ef57bdfc9417ff))
* bump the react group across 1 directory with 2 updates ([1491969](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1491969766106a5ab23dcdd20e244b6210394cff))
* bump web-vitals from 4.2.4 to 6.1.1 ([60b4e19](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/60b4e191545b09b688df8df2c36d191a375636e3))
* bump web-vitals from 6.1.1 to 6.2.1 ([5dfafcb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5dfafcb648e6122a327865c4b36d2041cf074dcd))

### Miscellaneous Chores

* **556:** move implementation plans to gitignored .claude/plans/ ([3cd82eb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3cd82ebf497c823958b5faccb3ba52b4d11bde99))
* **deps-dev:** bump brace-expansion from 1.1.14 to 1.1.18 ([dd074af](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd074af32e1309323fa96c255950732859e7e7db))
* **deps:** bump dependabot/fetch-metadata from 2 to 3 ([#506](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/506)) ([1d3f342](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d3f3420615d6573b0107fb5013062e9b43f85b3))
* **deps:** bump fast-uri from 3.1.2 to 3.1.6 ([41ad1fb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/41ad1fb9a9c3f1cc6d8fb9b0a92073b79c5b806b))
* **deps:** bump ip-address from 10.2.0 to 10.7.0 ([3559105](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3559105548b77e89a14721d29e7f2023265d20b8))
* **deps:** bump JamesIves/github-pages-deploy-action ([2346f42](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2346f42131d4e262667d44fa979de9d4f0263bac))
* **deps:** bump js-yaml from 4.1.1 to 4.3.2 ([458ab15](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/458ab15be5e49dba57bd19c48b018cc821134213))
* **deps:** bump MishaKav/jest-coverage-comment from 1.0.33 to 1.0.36 ([ff75dea](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff75deaedfc3aad345cb9783ab7ad8472c2b9f8b))
* **deps:** bump postcss from 8.5.14 to 8.5.26 ([46b64f1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46b64f1a37d00af309fc0a03d458ab013847717e))
* **deps:** bump react-router and react-router-dom ([4940ecb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/4940ecb3304be7894ac02b4ec3fc6313da618008))
* **deps:** bump the i18next group across 1 directory with 3 updates ([50e45ac](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/50e45acc48faa970ae94c0929424ac959a894878))
* group release-it and @release-it/* dependabot updates ([82dc67b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/82dc67b09a46ba80ca0975b9ec03451eb63d4b6f))
* initialize shadcn/ui and add button, dropdown-menu, tooltip, select components ([5492550](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5492550956c12833fc68e7b9d18e28aae0cdb68f)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* release v0.11.10 ([b41898f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b41898f76321808b93bbcdf3b8f95d3a4f76b082))
* release v0.11.11 ([ace11f8](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ace11f8ae3c0e580be768d225804fc963dc80127))
* release v0.11.12 ([be22465](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/be22465fe50d099607e68efd161c44c427fa1c4f))
* release v0.11.13 ([9cad8a5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9cad8a5972860089e2cd2f75869088ad17cbc4af))
* release v0.11.14 ([98b8b08](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/98b8b08f011dfb3cf5d23abf75e6930025e6d8cf))
* release v0.11.15 ([6f105f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6f105f78819bb23067add134b78c2158984a9d23))
* release v0.11.16 ([6e30d89](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6e30d89b408c3d57493b778fe88989151fd876da))
* release v0.11.17 ([9a6fea3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9a6fea34db91d535b9d4e255d19c130704da3d61))
* release v0.11.5 ([c668e1e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c668e1e58389ab4f3663daaa5d8c4215f4b67cb9))
* release v0.11.6 ([8bb720c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8bb720c56649272206af3a6b361e1a2ccdb0c5a4))
* release v0.11.7 ([9335bdb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9335bdbc1f3b04b73f5c29c8dcf08e49b8ecd0bd))
* release v0.11.8 ([7882570](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882570c52ec28f2d2f0eb1e0f6018a330aa6006))
* release v0.11.9 ([1627797](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/16277979376e117485fda736a23213dfa3369280))
* remove @material-tailwind/react and Tailwind v3 postcss config ([6987769](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/698776962bcd402b3da64da64a5e6d50edc88d55)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead use-breakpoint hook (relied on removed Tailwind v3 JS config API) ([6b9ff2c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6b9ff2c216e0f4121683cd3003ae27e90c65dad6)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* shorten dependabot.yml header comment ([5668121](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5668121da222d3ba229dae020dfeccdb575cd292))
* upgrade Tailwind CSS v3 to v4 ([ad845b0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ad845b02fbde13861cedddb019aa2704de0fff71)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Continuous Integration

* add GitHub App auto-approver with Copilot review gate ([#514](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/514)) ([1d828ad](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d828adf8ce14bbd0704c2e15c1510f2704a1eaa))
* enforce Conventional Commits format on every PR commit ([fe44402](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/fe4440267f1af3b8342a574ff3c59c640c7886c1))

### Documentation

* **556:** add shadcn migration plan ([bbe9ff3](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/bbe9ff33649d40fa3dd59c9055538b2be45b0071)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Styles

* apply project prettier formatting to shadcn-generated components ([55c480a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/55c480a3f6d4ae38c2b843b7cb36ccf46f668773)), references [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* require braces on all if statements ([0d24a45](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0d24a45e8f11538feee8e42df084bd2b468fe47a))

### Build System

* add typecheck script and wire it into the QA pipeline ([ef1914f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ef1914fa3ac70ff23bd92d51e710a0475f1b86f1))

## [0.11.17](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.16...0.11.17) (2026-09-01)

### Bug Fixes

* **402:** scope QA coverage comment to PRs, repair badge trigger ([5a4ed8a](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5a4ed8a933b314fab46f6becd49a5a7606d1ad01))
* add Dependency Updates changelog section, un-hide chore and refactor, hide deps-ci ([00d61ef](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/00d61ef6bf6e29ff1cf9e4e2a6f52fe09ae5707e))
* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* address PR review nits on release-debounce workflow ([24c3244](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/24c32443056b10184362ba772f3057ae24b13dd5))
* allow hyphenated commit types in commitlint header pattern ([d9acb58](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d9acb584da5931f4156351c6bb813c86d4de8945))
* clarify upstream main branch belongs to buddy-harmony, not the fork ([7882df1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882df1d651a4eb2f8813f7bc7151f97bd4becea))
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* disable body-max-line-length to unblock Dependabot commit lint ([1172aa7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1172aa73ee3bb3927e3d292386c2e1e660520006))
* extend dependabot ignore rules to prevent peer-dependency breaks ([5d16567](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5d16567d3530b2a19f87359f877029d8d1305c88)), closes [#555](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/555) [#575](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/575)
* give Dependabot commits distinct deps/deps-dev/deps-ci conventional-commit types ([1dccffb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1dccffbfaa2f5a47f90cd84a63064ea3b88fa7a9))
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json to match CI's npm version ([2ae0d9e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2ae0d9ecd6424644e0e16eabb8771a9aa13ac106))
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* resolve react-hooks lint violations in LanguageSelector ([2c347cf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2c347cf924c4f13a912bb44bf5e2181967cff408))
* resolve remaining react-hooks lint violations ([246f220](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/246f2202f8c1a65f20748710317e9c0d0ab52bff))
* restore feature alias in changelog types for parity with upstream default ([37727ce](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/37727ce2d819cd774e69f7c11f7d5bcd96a9d9bc))
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* revert update coverage badge authentication ([76f9871](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/76f9871ea282ef400ef74783cb2124fc2e9f5a41))
* skip release when other PRs are open against main, or the last commit is itself a release ([b5bf841](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b5bf841c215c2a0610df5353957db2ccca3ffc05))
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* update coverage badge authentication ([573b25b](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/573b25bd1d20359efea3ce9627b24b01bee14f2d))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Code Refactoring

* migrate CagedContent, ChordContent, ScaleContent from Material Tailwind to shadcn/ui ([38cb2d5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/38cb2d57bbd9bdaff4e35290cb343c0da29e18fc)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate ChordSelector, KeySelector, ScaleSelector from Material Tailwind to shadcn/ui ([0968af7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0968af70f19e8fc187d1236c531ef7c505fd5341)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Header and Footer from Material Tailwind to shadcn/ui ([e1cae0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e1cae0e24cac14bfe865f70c3b596176ecec8e98)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate SettingsTools from Material Tailwind to shadcn/ui ([a02d8bf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/a02d8bf8d3835204abdf22ebcab07dba8d0d4f7a)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Toolbar from Material Tailwind to shadcn/ui ([0c112e5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0c112e59470594ad0f1d897383fc7833bbe54a70)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Dependency Updates

* bump immutable from 5.1.5 to 5.1.9 ([c01e4cb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c01e4cbe4d076e08c5884503a37ba442a6ea36ec))
* bump lodash and commitizen ([3a42a32](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3a42a32ab6f891913272d5febbf49cc486c49ff6))
* bump the fortawesome group across 1 directory with 6 updates ([1253ed5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1253ed5616546273042ebb20b1ef57bdfc9417ff))
* bump the react group across 1 directory with 2 updates ([1491969](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1491969766106a5ab23dcdd20e244b6210394cff))
* bump web-vitals from 4.2.4 to 6.1.1 ([60b4e19](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/60b4e191545b09b688df8df2c36d191a375636e3))
* bump web-vitals from 6.1.1 to 6.2.1 ([5dfafcb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5dfafcb648e6122a327865c4b36d2041cf074dcd))

### Miscellaneous Chores

* **556:** move implementation plans to gitignored .claude/plans/ ([3cd82eb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3cd82ebf497c823958b5faccb3ba52b4d11bde99))
* **deps-dev:** bump brace-expansion from 1.1.14 to 1.1.18 ([dd074af](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd074af32e1309323fa96c255950732859e7e7db))
* **deps:** bump dependabot/fetch-metadata from 2 to 3 ([#506](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/506)) ([1d3f342](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d3f3420615d6573b0107fb5013062e9b43f85b3))
* **deps:** bump fast-uri from 3.1.2 to 3.1.6 ([41ad1fb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/41ad1fb9a9c3f1cc6d8fb9b0a92073b79c5b806b))
* **deps:** bump ip-address from 10.2.0 to 10.7.0 ([3559105](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3559105548b77e89a14721d29e7f2023265d20b8))
* **deps:** bump JamesIves/github-pages-deploy-action ([2346f42](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2346f42131d4e262667d44fa979de9d4f0263bac))
* **deps:** bump js-yaml from 4.1.1 to 4.3.2 ([458ab15](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/458ab15be5e49dba57bd19c48b018cc821134213))
* **deps:** bump MishaKav/jest-coverage-comment from 1.0.33 to 1.0.36 ([ff75dea](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff75deaedfc3aad345cb9783ab7ad8472c2b9f8b))
* **deps:** bump postcss from 8.5.14 to 8.5.26 ([46b64f1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46b64f1a37d00af309fc0a03d458ab013847717e))
* **deps:** bump react-router and react-router-dom ([4940ecb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/4940ecb3304be7894ac02b4ec3fc6313da618008))
* **deps:** bump the i18next group across 1 directory with 3 updates ([50e45ac](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/50e45acc48faa970ae94c0929424ac959a894878))
* initialize shadcn/ui and add button, dropdown-menu, tooltip, select components ([5492550](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5492550956c12833fc68e7b9d18e28aae0cdb68f)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* release v0.11.10 ([b41898f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b41898f76321808b93bbcdf3b8f95d3a4f76b082))
* release v0.11.11 ([ace11f8](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ace11f8ae3c0e580be768d225804fc963dc80127))
* release v0.11.12 ([be22465](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/be22465fe50d099607e68efd161c44c427fa1c4f))
* release v0.11.13 ([9cad8a5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9cad8a5972860089e2cd2f75869088ad17cbc4af))
* release v0.11.14 ([98b8b08](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/98b8b08f011dfb3cf5d23abf75e6930025e6d8cf))
* release v0.11.15 ([6f105f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6f105f78819bb23067add134b78c2158984a9d23))
* release v0.11.16 ([6e30d89](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6e30d89b408c3d57493b778fe88989151fd876da))
* release v0.11.5 ([c668e1e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c668e1e58389ab4f3663daaa5d8c4215f4b67cb9))
* release v0.11.6 ([8bb720c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8bb720c56649272206af3a6b361e1a2ccdb0c5a4))
* release v0.11.7 ([9335bdb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9335bdbc1f3b04b73f5c29c8dcf08e49b8ecd0bd))
* release v0.11.8 ([7882570](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882570c52ec28f2d2f0eb1e0f6018a330aa6006))
* release v0.11.9 ([1627797](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/16277979376e117485fda736a23213dfa3369280))
* remove @material-tailwind/react and Tailwind v3 postcss config ([6987769](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/698776962bcd402b3da64da64a5e6d50edc88d55)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead use-breakpoint hook (relied on removed Tailwind v3 JS config API) ([6b9ff2c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6b9ff2c216e0f4121683cd3003ae27e90c65dad6)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* shorten dependabot.yml header comment ([5668121](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5668121da222d3ba229dae020dfeccdb575cd292))
* upgrade Tailwind CSS v3 to v4 ([ad845b0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ad845b02fbde13861cedddb019aa2704de0fff71)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.16](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.15...0.11.16) (2026-08-30)

### Bug Fixes

* add Dependency Updates changelog section, un-hide chore and refactor, hide deps-ci ([00d61ef](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/00d61ef6bf6e29ff1cf9e4e2a6f52fe09ae5707e))
* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* address PR review nits on release-debounce workflow ([24c3244](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/24c32443056b10184362ba772f3057ae24b13dd5))
* allow hyphenated commit types in commitlint header pattern ([d9acb58](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/d9acb584da5931f4156351c6bb813c86d4de8945))
* clarify upstream main branch belongs to buddy-harmony, not the fork ([7882df1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882df1d651a4eb2f8813f7bc7151f97bd4becea))
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* disable body-max-line-length to unblock Dependabot commit lint ([1172aa7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1172aa73ee3bb3927e3d292386c2e1e660520006))
* extend dependabot ignore rules to prevent peer-dependency breaks ([5d16567](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5d16567d3530b2a19f87359f877029d8d1305c88)), closes [#555](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/555) [#575](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/575)
* give Dependabot commits distinct deps/deps-dev/deps-ci conventional-commit types ([1dccffb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1dccffbfaa2f5a47f90cd84a63064ea3b88fa7a9))
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json to match CI's npm version ([2ae0d9e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2ae0d9ecd6424644e0e16eabb8771a9aa13ac106))
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore feature alias in changelog types for parity with upstream default ([37727ce](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/37727ce2d819cd774e69f7c11f7d5bcd96a9d9bc))
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* skip release when other PRs are open against main, or the last commit is itself a release ([b5bf841](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b5bf841c215c2a0610df5353957db2ccca3ffc05))
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Code Refactoring

* migrate CagedContent, ChordContent, ScaleContent from Material Tailwind to shadcn/ui ([38cb2d5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/38cb2d57bbd9bdaff4e35290cb343c0da29e18fc)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate ChordSelector, KeySelector, ScaleSelector from Material Tailwind to shadcn/ui ([0968af7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0968af70f19e8fc187d1236c531ef7c505fd5341)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Header and Footer from Material Tailwind to shadcn/ui ([e1cae0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e1cae0e24cac14bfe865f70c3b596176ecec8e98)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate SettingsTools from Material Tailwind to shadcn/ui ([a02d8bf](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/a02d8bf8d3835204abdf22ebcab07dba8d0d4f7a)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* migrate Toolbar from Material Tailwind to shadcn/ui ([0c112e5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/0c112e59470594ad0f1d897383fc7833bbe54a70)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

### Dependency Updates

* bump immutable from 5.1.5 to 5.1.9 ([c01e4cb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c01e4cbe4d076e08c5884503a37ba442a6ea36ec))
* bump lodash and commitizen ([3a42a32](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3a42a32ab6f891913272d5febbf49cc486c49ff6))
* bump the fortawesome group across 1 directory with 6 updates ([1253ed5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1253ed5616546273042ebb20b1ef57bdfc9417ff))
* bump the react group across 1 directory with 2 updates ([1491969](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1491969766106a5ab23dcdd20e244b6210394cff))

### Miscellaneous Chores

* **556:** move implementation plans to gitignored .claude/plans/ ([3cd82eb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3cd82ebf497c823958b5faccb3ba52b4d11bde99))
* **deps-dev:** bump brace-expansion from 1.1.14 to 1.1.18 ([dd074af](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd074af32e1309323fa96c255950732859e7e7db))
* **deps:** bump dependabot/fetch-metadata from 2 to 3 ([#506](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/506)) ([1d3f342](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1d3f3420615d6573b0107fb5013062e9b43f85b3))
* **deps:** bump fast-uri from 3.1.2 to 3.1.6 ([41ad1fb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/41ad1fb9a9c3f1cc6d8fb9b0a92073b79c5b806b))
* **deps:** bump ip-address from 10.2.0 to 10.7.0 ([3559105](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3559105548b77e89a14721d29e7f2023265d20b8))
* **deps:** bump JamesIves/github-pages-deploy-action ([2346f42](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/2346f42131d4e262667d44fa979de9d4f0263bac))
* **deps:** bump js-yaml from 4.1.1 to 4.3.2 ([458ab15](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/458ab15be5e49dba57bd19c48b018cc821134213))
* **deps:** bump MishaKav/jest-coverage-comment from 1.0.33 to 1.0.36 ([ff75dea](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ff75deaedfc3aad345cb9783ab7ad8472c2b9f8b))
* **deps:** bump postcss from 8.5.14 to 8.5.26 ([46b64f1](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46b64f1a37d00af309fc0a03d458ab013847717e))
* **deps:** bump react-router and react-router-dom ([4940ecb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/4940ecb3304be7894ac02b4ec3fc6313da618008))
* **deps:** bump the i18next group across 1 directory with 3 updates ([50e45ac](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/50e45acc48faa970ae94c0929424ac959a894878))
* initialize shadcn/ui and add button, dropdown-menu, tooltip, select components ([5492550](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5492550956c12833fc68e7b9d18e28aae0cdb68f)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* release v0.11.10 ([b41898f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b41898f76321808b93bbcdf3b8f95d3a4f76b082))
* release v0.11.11 ([ace11f8](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ace11f8ae3c0e580be768d225804fc963dc80127))
* release v0.11.12 ([be22465](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/be22465fe50d099607e68efd161c44c427fa1c4f))
* release v0.11.13 ([9cad8a5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9cad8a5972860089e2cd2f75869088ad17cbc4af))
* release v0.11.14 ([98b8b08](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/98b8b08f011dfb3cf5d23abf75e6930025e6d8cf))
* release v0.11.15 ([6f105f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6f105f78819bb23067add134b78c2158984a9d23))
* release v0.11.5 ([c668e1e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c668e1e58389ab4f3663daaa5d8c4215f4b67cb9))
* release v0.11.6 ([8bb720c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8bb720c56649272206af3a6b361e1a2ccdb0c5a4))
* release v0.11.7 ([9335bdb](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/9335bdbc1f3b04b73f5c29c8dcf08e49b8ecd0bd))
* release v0.11.8 ([7882570](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/7882570c52ec28f2d2f0eb1e0f6018a330aa6006))
* release v0.11.9 ([1627797](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/16277979376e117485fda736a23213dfa3369280))
* remove @material-tailwind/react and Tailwind v3 postcss config ([6987769](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/698776962bcd402b3da64da64a5e6d50edc88d55)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead use-breakpoint hook (relied on removed Tailwind v3 JS config API) ([6b9ff2c](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6b9ff2c216e0f4121683cd3003ae27e90c65dad6)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* shorten dependabot.yml header comment ([5668121](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/5668121da222d3ba229dae020dfeccdb575cd292))
* upgrade Tailwind CSS v3 to v4 ([ad845b0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ad845b02fbde13861cedddb019aa2704de0fff71)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.15](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.14...0.11.15) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.14](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.13...0.11.14) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.13](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.12...0.11.13) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.12](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.11...0.11.12) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.11](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.10...0.11.11) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.10](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.9...0.11.10) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.9](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.8...0.11.9) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.8](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.7...0.11.8) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.7](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.6...0.11.7) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* merge release PR directly instead of via auto-merge ([8efc1f2](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/8efc1f2fe659a9e991a87ee790120babbe13d95b))
* merge release PRs using the App's installation token ([52e83ae](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/52e83ae816af95d36e67d0f43703a41a684d8ca8))
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* update auto-merge commands from squash/merge to rebase ([dd1d9f7](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/dd1d9f78f2a3aa1ff4c029612f789536282faa03))
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.6](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.5...0.11.6) (2026-08-29)

### Bug Fixes

* address PR review comments and pin exact Node version ([3818406](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/3818406c7ddeb77fb0246739339261c755ce93a2)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct dropdown width and remove Tailwind v3-only utility classes in SettingsTools ([6ac98c0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6ac98c092718f163d1bfea363b1da4192561ec23)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* correct DropdownMenuItem composition and tooltip accessibility in Header/Footer ([c89a2ee](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/c89a2eeef666db3198916a137ff334077684a471)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* prevent infinite render loop in LanguageSelector language sync ([f009c0e](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/f009c0e7567643187a8fa52e9f776b175f12fd58)), closes [#54](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/54) [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* regenerate package-lock.json for npm 11.19+ compatibility ([1ab6ac5](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/1ab6ac5f0ab58ce9a2bb74ef875d967709963d51)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* remove dead/overriding classes from selector dropdowns ([e968d40](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/e968d4038760e54585069abb61e17d7a2b0a0473)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* replace Material Tailwind ThemeProvider with shadcn TooltipProvider ([b13959d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/b13959dc021825c677f600be281d495b16cfe335)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* restore print icon size after shadcn Button default size override ([46cc07d](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/46cc07d2941039d69a737a9ab405c7fe16c4e249)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)
* use named import for assert-ts to fix broken default-export interop under Vite ([73483d0](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/73483d08cf31d9e71c376d14bf396d0bfe67a2f5)), closes [#556](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/556)

## [0.11.5](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.5) (2026-05-18)

## [0.11.4](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.3...0.11.4) (2026-05-10)

## [0.11.3](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.2...0.11.3) (2026-05-10)

## [0.11.2](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.1...0.11.2) (2026-05-10)

## [0.11.1](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.0...0.11.1) (2026-05-10)

## [0.11.0](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.9.1...0.11.0) (2026-05-10)

### Features

* add commitizen and conventional-changelog to release-it ([#500](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/500)) ([ee439c8](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ee439c8e5811af35728546f11516158116b1e1c6))
* add commitizen and conventional-changelog to release-it ([#502](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/502)) ([6e7bb0f](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/6e7bb0f6be59842e9c2d4dd32ca71ba83a30a153))

### Bug Fixes

* bump version to 0.10.0 ([#503](https://github.com/Marthijs-Berfelo/buddy-harmony/issues/503)) ([ea86972](https://github.com/Marthijs-Berfelo/buddy-harmony/commit/ea86972a20ed45a28d5b10894ad10f92f33057b1))
