module.exports = {
  extends: ['@commitlint/config-conventional'],
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
