module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: "node",
    modulePathIgnorePatterns: [
      "client/"
    ],
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "client/"
    ]
  };
  