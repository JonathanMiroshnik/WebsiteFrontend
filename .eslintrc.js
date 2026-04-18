module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    htmx: 'readonly',
    navigateTo: 'readonly',
    addHTMLContent: 'readonly',
    resetStyles: 'readonly',
  },
  rules: {
    // Best practices
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-alert': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'always'],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Code quality
    complexity: ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines-per-function': ['warn', 50],

    // Security
    'no-eval': 'error',
    'no-implied-eval': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js', 'jest.setup.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
};
