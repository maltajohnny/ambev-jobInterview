const { buildUsuarioPayload } = require('../../services/LoginPage/payload/usuario.payload');

describe('API — Admin Usuarios', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  beforeEach(() => {
    cy.ensureAdminSessionForApi();
  });

  it('garante existência de admin principal e schema de listagem', () => {
    const adminEmail = Cypress.env('ADMIN_USER_EMAIL');

    cy.api({
      method: 'GET',
      url: `${apiBaseUrl}/usuarios`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema('usuarios.json', response.body);

      const admin = response.body.usuarios.find((u) => u.email === adminEmail);
      expect(admin, `admin ${adminEmail} deveria existir`).to.exist;
      expect(admin.administrador).to.eq('true');
    });
  });

  it('cria e exclui usuário admin via API', () => {
    const email = `admin.api.${Date.now()}@example.com`;
    const payload = buildUsuarioPayload({
      nome: `Admin API ${Date.now()}`,
      email,
      password: 'SenhaAdminApi123',
      administrador: 'true',
    });

    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/usuarios`,
      body: payload,
      failOnStatusCode: false,
    }).then((createResp) => {
      expect(createResp.status).to.eq(201);
      const userId = createResp.body._id;
      expect(userId).to.be.a('string').and.not.be.empty;

      cy.api({
        method: 'DELETE',
        url: `${apiBaseUrl}/usuarios/${userId}`,
        failOnStatusCode: false,
      }).then((deleteResp) => {
        expect(deleteResp.status).to.eq(200);
      });
    });
  });
});
