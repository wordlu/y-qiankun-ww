module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      parser: 'babel-eslint',
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      modules: true,
      legacyDecorators: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': 0, // 允许导入省略的扩展名
    'import/no-unresolved': 0, // 允许解析省略扩展名的模块
    'vue/multi-word-component-names': 0, // 允许组件名单个单词
    'no-param-reassign': 0, // 允许对函数参数再赋值
    'no-restricted-syntax': 0, // AST 选择器
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': ['off'],
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        semi: true,
        vueIndentScriptAndStyle: true,
        singleQuote: true,
        trailingComma: 'all',
        proseWrap: 'never',
        htmlWhitespaceSensitivity: 'strict',
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
