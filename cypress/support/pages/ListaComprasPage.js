const { LISTA_COMPRAS_BUTTONS, LISTA_COMPRAS_TEXT } = require('./elements');

const ListaComprasPage = {
  visit() {
    cy.visit('/minhaListaDeProdutos');
  },

  clickLimparLista() {
    cy.get(LISTA_COMPRAS_BUTTONS.limpar).click();
  },

  clickPaginaInicial() {
    cy.get(LISTA_COMPRAS_BUTTONS.pagina_inicial).click();
  },

  clickAdicionarCarrinho() {
    cy.get(LISTA_COMPRAS_BUTTONS.adicionar_carrinho).click();
  },

  expectListaVazia() {
    cy.get(LISTA_COMPRAS_TEXT.mensagem_vazia).should('be.visible');
  },
};

module.exports = ListaComprasPage;
