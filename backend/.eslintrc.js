module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
  ],
  settings: {
    'import/extensions': ['.ts', '.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js']
    },
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts']
      },
      'typescript': {
        'alwaysTryTypes': true,
        'directory': './tsconfig.json',
      },
    },
  },
  overrides: [{
    files: ['**/*.ts'],
    extends: [
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
    ],
    rules: {
      '@typescript-eslint/camelcase': 'off',
    }
  }],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
    'import/no-unresolved': 'error',
    'import/extensions': ['error', 'ignorePackages', { 'js': 'never', 'ts': 'never' }],
    'lines-between-class-members': 'off'
  },
};
