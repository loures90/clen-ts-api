export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*ts', '!<rootDir>/src/**/*protocols.ts', '!<rootDir>/src/**/protocols/*ts', '!<rootDir>/src/main/**', '!<rootDir>/src/**/test/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  preset: '@shelf/jest-mongodb'
}
