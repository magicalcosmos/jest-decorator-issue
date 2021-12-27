/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['.'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    // process *.vue files with vue-jest
    '.*\\.(vue)$': 'vue-jest',
    // process TypeScript files
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // process TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: null,
  // serializer for snapshots
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  collectCoverageFrom: [
    'src/components/*.{js,vue,ts,tsx}',
    'src/views/components/*.{js,vue,ts,tsx}',
    'src/utils/*.{js,vue,ts,tsx}',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules'],
  testURL: 'http://localhost/',
  testMatch: ['**/?(*.)(spec|test).(j|t)s?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!vue-fullscreen)',
    '/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'
  ],
  testPathIgnorePatterns: ['node_modules', '.history'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
