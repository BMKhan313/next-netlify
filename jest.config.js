const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);


// import nextJest from 'next/jest.js';
// // const nextJest = require('next/jest.js')

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// });

// // Add any custom config to be passed to Jest
// /** @type {import('jest').Config} */
// const config = {
//   // Add more setup options before each test is run
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jest-environment-jsdom',

// };

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);

