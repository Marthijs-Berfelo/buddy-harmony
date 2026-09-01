# Changelog

## [0.11.17](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.17) (2026-09-01)

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

## [0.11.16](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.16) (2026-08-30)

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

## [0.11.15](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.15) (2026-08-29)

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

## [0.11.14](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.14) (2026-08-29)

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

## [0.11.13](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.13) (2026-08-29)

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

## [0.11.12](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.12) (2026-08-29)

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

## [0.11.11](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.11) (2026-08-29)

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

## [0.11.10](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.10) (2026-08-29)

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

## [0.11.9](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.9) (2026-08-29)

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

## [0.11.8](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.8) (2026-08-29)

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

## [0.11.7](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.7) (2026-08-29)

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

## [0.11.6](https://github.com/Marthijs-Berfelo/buddy-harmony/compare/0.11.4...0.11.6) (2026-08-29)

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
