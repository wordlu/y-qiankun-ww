module.exports = {
  root: true,
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/*.{html,vue}'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.{css,scss,sass}'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep', 'input-placeholder', 'v-deep'],
      },
    ],
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message: 'Expected class selector to be kebab-case or snake_case',
      },
    ],
  },
};
