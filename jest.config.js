module.exports = {
  testEnvironment: "jsdom",
  rootDir: ".",
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.js"],
  testEnvironmentOptions: { url: "http://localhost:3001" },
  clearMocks: true,
};
