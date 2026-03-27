/**
 * Ambiente de execução (local vs pipeline).
 * `isPipeline` é injetado em cypress.config.js (setupNodeEvents) a partir de CI / GITHUB_ACTIONS.
 */
function isPipeline() {
  return Boolean(Cypress.env('isPipeline'));
}

function isLocal() {
  return !isPipeline();
}

module.exports = {
  isPipeline,
  isLocal,
};
