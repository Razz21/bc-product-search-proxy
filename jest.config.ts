export default {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "node_modules",
    "_types",
    '__tests__'
  ],
  coverageProvider: "v8",
  moduleNameMapper: {
    "^~/(.*)": "<rootDir>/$1"
  },
  testEnvironment: "jest-environment-node",
  testMatch: [
    "**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)",
  ],
};
