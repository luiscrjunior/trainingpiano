module.exports = {
  'extends': 'standard',
  'env': {
    'es6': true,
  },
  'parserOptions': {
    'ecmaVersion': 6,
  },
  'parser': 'babel-eslint',
  'rules': {
    'strict': 0,
    'semi': ['error', 'always'],
    'no-var': 'error',
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-unused-vars': 'off',
    'padded-blocks': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'spaced-comment': 'off',
    'handle-callback-err': 'off',
  },
  'globals': {
    'chrome': true,
    'PRODUCTION': true,
    'DEVELOPMENT': true,
  },
};
