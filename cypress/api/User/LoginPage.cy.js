const { buildLoginPayload } = require('../../services/LoginPage/payload/login.payload');
const { loginRequestOptions } = require('../../services/LoginPage/requests/login.request');

describe('API — Login (/login)', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  before(() => {
    cy.ensureUserSessionForApi();
  });

  it('login válido retorna 200, token e schema de login', () => {
    const body = buildLoginPayload({
      email: Cypress.env('USER_EMAIL'),
      password: Cypress.env('USER_PASSWORD'),
    });

    cy.api(loginRequestOptions(apiBaseUrl, body)).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;
      cy.validateSchema('login.json', response.body);
    });
  });

  it('login inválido retorna 401 e schema de erro', () => {
    const body = buildLoginPayload({
      email: Cypress.env('USER_EMAIL'),
      password: 'senha-invalida-api',
    });

    cy.api(loginRequestOptions(apiBaseUrl, body)).then((response) => {
      expect(response.status).to.eq(401);
      cy.validateSchema('login.json', response.body);
    });
  });
});
