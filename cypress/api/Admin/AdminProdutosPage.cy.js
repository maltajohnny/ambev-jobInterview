const { buildProdutoPayload } = require('../../services/ProductsPage/payload/produto.payload');

describe('API — Admin Produtos', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  beforeEach(() => {
    cy.ensureAdminSessionForApi();
  });

  it('cria produto como admin, valida listagem e exclui', () => {
    const token = Cypress.env('adminAuthToken');
    const unique = Date.now();
    const body = buildProdutoPayload({
      nome: `Produto API Admin ${unique}`,
      preco: 999,
      descricao: `Descricao API ${unique}`,
      quantidade: 7,
    });

    cy.api({
      method: 'POST',
      url: `${apiBaseUrl}/produtos`,
      headers: { Authorization: token },
      body,
      failOnStatusCode: false,
    }).then((createResp) => {
      expect(createResp.status).to.eq(201);
      const productId = createResp.body._id;
      expect(productId).to.be.a('string').and.not.be.empty;

      cy.api({
        method: 'GET',
        url: `${apiBaseUrl}/produtos`,
        failOnStatusCode: false,
      }).then((listResp) => {
        expect(listResp.status).to.eq(200);
        cy.validateSchema('produtos.json', listResp.body);
        const created = listResp.body.produtos.find((p) => p._id === productId);
        expect(created).to.exist;
        expect(created.nome).to.eq(body.nome);
      });

      cy.api({
        method: 'DELETE',
        url: `${apiBaseUrl}/produtos/${productId}`,
        headers: { Authorization: token },
        failOnStatusCode: false,
      }).then((deleteResp) => {
        expect(deleteResp.status).to.eq(200);
      });
    });
  });
});
