const AdminUsuariosPage = require('../support/pages/AdminUsuariosPage');
const AdminProdutosPage = require('../support/pages/AdminProdutosPage');

describe('Integração — API x Front', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  it('cria usuário via API e valida presença no Front (admin/listarusuarios)', () => {
    const email = `integracao.user.${Date.now()}@example.com`;
    const payload = {
      nome: `Integracao User ${Date.now()}`,
      email,
      password: 'SenhaIntegracao123',
      administrador: 'false',
    };

    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/usuarios`,
      body: payload,
      failOnStatusCode: false,
    }).then((createResp) => {
      expect(createResp.status).to.eq(201);
      const userId = createResp.body._id;

      cy.adminLogin();
      AdminUsuariosPage.visitListar();
      AdminUsuariosPage.linhaPorEmail(email).should('exist');

      cy.api({
        method: 'DELETE',
        url: `${apiBaseUrl}/usuarios/${userId}`,
        failOnStatusCode: false,
      }).its('status').should('eq', 200);
    });
  });

  it('cria produto no Front (admin) e valida existência via API /produtos', () => {
    const unique = Date.now();
    const nome = `Integracao Produto ${unique}`;
    const preco = 321;
    const descricao = `Descricao Integracao ${unique}`;
    const quantidade = 5;

    cy.adminLogin();
    AdminProdutosPage.visitCadastrar();
    AdminProdutosPage.cadastrarProduto({ nome, preco, descricao, quantidade });

    cy.ensureAdminSessionForApi().then(() => {
      const token = Cypress.env('adminAuthToken');

      cy.api({
        method: 'GET',
        url: `${apiBaseUrl}/produtos`,
        failOnStatusCode: false,
      }).then((listResp) => {
        expect(listResp.status).to.eq(200);
        const created = listResp.body.produtos.find((p) => p.nome === nome);
        expect(created, `produto ${nome} deveria existir`).to.exist;

        cy.api({
          method: 'DELETE',
          url: `${apiBaseUrl}/produtos/${created._id}`,
          headers: { Authorization: token },
          failOnStatusCode: false,
        }).its('status').should('eq', 200);
      });
    });
  });
});
