const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/api/**/*.cy.js',
      'cypress/integration/**/*.cy.js',
    ],
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      config.env.USER_NAME =
        config.env.USER_NAME ||
        process.env.CYPRESS_USER_NAME ||
        process.env.USER_NAME;
      config.env.USER_EMAIL =
        config.env.USER_EMAIL ||
        process.env.CYPRESS_USER_EMAIL ||
        process.env.USER_EMAIL;
      config.env.USER_PASSWORD =
        config.env.USER_PASSWORD ||
        process.env.CYPRESS_USER_PASSWORD ||
        process.env.USER_PASSWORD;
      config.env.ADMIN_USER_NAME =
        config.env.ADMIN_USER_NAME ||
        process.env.CYPRESS_ADMIN_USER_NAME ||
        process.env.ADMIN_USER_NAME;
      config.env.ADMIN_USER_EMAIL =
        config.env.ADMIN_USER_EMAIL ||
        process.env.CYPRESS_ADMIN_USER_EMAIL ||
        process.env.ADMIN_USER_EMAIL;
      config.env.ADMIN_USER_PASSWORD =
        config.env.ADMIN_USER_PASSWORD ||
        process.env.CYPRESS_ADMIN_USER_PASSWORD ||
        process.env.ADMIN_USER_PASSWORD;

      config.env.apiBaseUrl =
        config.env.apiBaseUrl || 'https://serverest.dev';
      config.env.frontendBaseUrl =
        config.env.frontendBaseUrl || 'https://front.serverest.dev';
      config.env.isPipeline = Boolean(
        process.env.CI || process.env.GITHUB_ACTIONS,
      );
      return config;
    },
  },
});
