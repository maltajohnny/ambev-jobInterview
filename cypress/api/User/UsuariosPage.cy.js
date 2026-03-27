const { buildUsuarioPayload } = require('../../services/LoginPage/payload/usuario.payload');
const { createUsuarioRequestOptions } = require('../../services/LoginPage/requests/usuario.request');

describe('API — Usuarios (/usuarios)', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  it('lista usuários com status 200 e schema válido', () => {
    cy.api({
      method: 'GET',
      url: `${apiBaseUrl}/usuarios`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema('usuarios.json', response.body);
    });
  });

  it('cadastra usuário sem admin com status 201', () => {
    const payload = buildUsuarioPayload({
      nome: `QA Cypress ${Date.now()}`,
      email: `qa.${Date.now()}@example.com`,
      password: 'SenhaValida123',
      administrador: 'false',
    });

    cy.api(createUsuarioRequestOptions(apiBaseUrl, payload)).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.be.a('string').and.not.be.empty;
    });
  });
});
