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
    // wagoid/commitlint-github-action@6.2.1 bundles @commitlint/ensure@19.0.3, which
    // lacks the URL exception present in newer versions - Dependabot's release-note
    // links routinely exceed 100 chars and would otherwise fail in CI (but not locally
    // with a newer @commitlint/ensure), so disable this rule rather than chase a
    // moving target.
    'body-max-line-length': [0],
  },
};
