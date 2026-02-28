module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'semi': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'quotes': ['error', 'single'],
    'brace-style': ['error', 'stroustrup'],
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
  },
}
