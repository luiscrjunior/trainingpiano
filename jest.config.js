module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/client/**/*.test.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^app(.*)$': '<rootDir>/client/js$1',
    '^css(.*)$': '<rootDir>/client/css$1',
    '^components(.*)$': '<rootDir>/client/js/components$1',
    '^store(.*)$': '<rootDir>/client/js/store$1',
    '^app/utils(.*)$': '<rootDir>/client/js/utils$1',
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
};
