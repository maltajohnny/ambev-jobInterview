const { listProdutosRequestOptions } = require('../../services/ProductsPage/requests/produto.request');

describe('API — Produtos (/produtos)', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  it('lista produtos com status 200 e schema válido', () => {
    cy.api(listProdutosRequestOptions(apiBaseUrl)).then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema('produtos.json', response.body);
    });
  });
});
