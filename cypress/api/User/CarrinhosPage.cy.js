describe('API — Carrinhos (/carrinhos)', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

  it('lista carrinhos com status 200 e schema válido', () => {
    cy.api({
      method: 'GET',
      url: `${apiBaseUrl}/carrinhos`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema('carrinhos.json', response.body);
    });
  });

  it('valida consistência de produtos, precoTotal e quantidadeTotal de cada carrinho', () => {
    cy.api({
      method: 'GET',
      url: `${apiBaseUrl}/carrinhos`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.validateSchema('carrinhos.json', response.body);

      const { carrinhos } = response.body;
      expect(carrinhos).to.be.an('array');

      carrinhos.forEach((carrinho) => {
        expect(carrinho.produtos).to.be.an('array');

        let somaPrecoTotal = 0;
        let somaQuantidadeTotal = 0;

        carrinho.produtos.forEach((produto) => {
          expect(produto.idProduto, 'idProduto do item').to.be.a('string').and.not
            .be.empty;
          expect(produto.quantidade, 'quantidade do item').to.be.a('number').and
            .to.be.greaterThan(0);
          expect(produto.precoUnitario, 'precoUnitario do item')
            .to.be.a('number')
            .and.to.be.greaterThan(0);

          somaPrecoTotal += produto.precoUnitario * produto.quantidade;
          somaQuantidadeTotal += produto.quantidade;
        });

        expect(
          carrinho.precoTotal,
          `precoTotal inconsistente no carrinho ${carrinho._id}`,
        ).to.eq(somaPrecoTotal);
        expect(
          carrinho.quantidadeTotal,
          `quantidadeTotal inconsistente no carrinho ${carrinho._id}`,
        ).to.eq(somaQuantidadeTotal);
      });
    });
  });
});
