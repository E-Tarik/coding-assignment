/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // transform: {
  //   "^.+\\.(t|j)sx$": "ts-jest",
  //   "^.+\\.scss$": "jest-scss-transform",
  // },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^redux/(.*)$': '<rootDir>/src/redux/$1',
    pages: '<rootDir>/src/pages/index.ts',
    services: '<rootDir>/src/services/index.ts',
    hooks: '<rootDir>/src/hooks/index.ts',
    // helpers: "<rootDir>/src/helpers/index.ts",
    models: '<rootDir>/src/models/index.ts',
    components: '<rootDir>/src/components/index.ts',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/axios',
  ],
};
