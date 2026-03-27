const {
  HOME_INPUTS,
  HOME_BUTTONS,
  HOME_NAV,
  HOME_CART,
  HOME_PRODUCT,
} = require('./elements');

const HomePage = {
  visit() {
    cy.visit('/home');
  },

  searchProducts(term) {
    cy.get(HOME_INPUTS.pesquisar).clear();
    cy.get(HOME_INPUTS.pesquisar).type(term);
    cy.get(HOME_BUTTONS.pesquisar).click();
  },

  getListCounter() {
    return cy.get(HOME_CART.contador);
  },

  /** Link pai navega para /minhaListaDeProdutos; o contador só existe na /home. */
  addFirstProductToList() {
    cy.get(HOME_PRODUCT.adicionar_lista).first().click();
    cy.visit('/home');
  },

  openShoppingListViaNav() {
    cy.get(HOME_NAV.lista_compras).click();
  },

  openShoppingListViaCartIcon() {
    cy.get(HOME_CART.icone_lista).click();
  },

  openFirstProductDetail() {
    cy.get(HOME_PRODUCT.link_detalhe).first().click();
  },
};

module.exports = HomePage;
