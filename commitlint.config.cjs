module.exports = {
  extends: ['@commitlint/config-conventional'],
  // @commitlint/config-conventional's default headerPattern (\w*) doesn't match
  // hyphens, so hyphenated types like deps-ci/deps-dev fail to parse entirely
  // (type-enum below never even runs). Extend the type group to allow hyphens.
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+(?:-\w+)*)(?:\((.*)\))?!?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'feature',
        'fix',
        'perf',
        'revert',
        'refactor',
        'deps',
        'deps-dev',
        'deps-ci',
        'chore',
        'ci',
        'docs',
        'style',
        'test',
        'build',
      ],
    ],
  },
};
