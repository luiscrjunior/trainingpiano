module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/client/**/*.test.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>/client/js'],
};
