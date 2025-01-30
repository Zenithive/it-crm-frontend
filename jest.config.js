// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Add this line if not already there
//   // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
//   testEnvironment: 'jsdom', // Ensure the correct test environment is being used
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensure babel-jest is handling JS/TS transformation
//   },
// };
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Ensure jest.setup.js is loaded
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
