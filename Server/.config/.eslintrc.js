module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // Ajout du plugin eslint-config-prettier
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      'no-extra-semi': 'error',
      'no-undef': 'error',
      'no-empty': 'warn',
    },
  };