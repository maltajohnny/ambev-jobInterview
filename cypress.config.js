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
