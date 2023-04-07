module.exports = {
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*mock*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*stories*.{js,jsx,ts,tsx}',
    '!<rootDir>/types/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/types/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/styles/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/utils/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/templates/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/app/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/config/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/**/stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],

  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/src/components/**/*.test.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/.out/',
    '/public/',
  ],

  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.ts'],
};
