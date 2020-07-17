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
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    'react/prop-types': 'off',
  },
  parser: 'babel-eslint',
  globals: {
    chrome: true,
    PRODUCTION: true,
    DEVELOPMENT: true,
  },
};
