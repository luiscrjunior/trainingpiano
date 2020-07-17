module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
  ],
  env: {
    es6: true,
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 6,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
  },
  parser: 'babel-eslint',
  globals: {
    chrome: true,
    PRODUCTION: true,
    DEVELOPMENT: true,
  },
};
