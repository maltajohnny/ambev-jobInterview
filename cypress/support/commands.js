const {
  ensureUserSessionForApi,
  ensureAdminSessionForApi,
  ensureUserSessionForE2E,
  ensureAdminSessionForE2E,
} = require('../utils/userSession');
const Ajv = require('ajv');

Cypress.Commands.add('ensureUserSessionForApi', (overrides) => {
  ensureUserSessionForApi(overrides);
});

Cypress.Commands.add('ensureUserSessionForE2E', (overrides) => {
  ensureUserSessionForE2E(overrides);
});

Cypress.Commands.add('ensureAdminSessionForApi', (overrides) => {
  ensureAdminSessionForApi(overrides);
});

Cypress.Commands.add('ensureAdminSessionForE2E', (overrides) => {
  ensureAdminSessionForE2E(overrides);
});

/**
 * Login E2E: verifica na API se o usuário existe; se não, cadastra na web com USER_* do env
 * e então autentica na UI. Usa os mesmos dados de `cypress.env.json` / `cypress.env.example.json`.
 */
Cypress.Commands.add('login', (overrides = {}) => {
  ensureUserSessionForE2E(overrides);
});

Cypress.Commands.add('adminLogin', (overrides = {}) => {
  ensureAdminSessionForE2E(overrides);
});

Cypress.Commands.add('validateSchema', (fixtureName, payload) => {
  cy.fixture(fixtureName).then((schema) => {
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const isValid = validate(payload);
    expect(
      isValid,
      `schema ${fixtureName} inválido: ${JSON.stringify(validate.errors)}`,
    ).to.eq(true);
  });
});
