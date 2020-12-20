module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['@react-native-community', 'eslint:recommended', 'prettier'],
  rules: {
    'capitalized-comments': ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-double'],
    'arrow-spacing': 'error',
    eqeqeq: ['error', 'always'],
    'no-const-assign': 'error',
    'no-shadow': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'sort-imports': 'error',
    'sort-keys': ['error', 'asc'],
    'space-before-blocks': ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'prettier/prettier': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
  plugins: ['sort-imports-es6-autofix', 'prettier'],
};
