module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  