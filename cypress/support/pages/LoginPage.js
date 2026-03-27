const { LOGIN_INPUTS, LOGIN_BUTTONS } = require('./elements');

const LoginPage = {
  visit() {
    cy.visit('/login');
  },

  login(email, password) {
    cy.get(LOGIN_INPUTS.email).clear();
    cy.get(LOGIN_INPUTS.email).type(email);
    cy.get(LOGIN_INPUTS.senha).clear();
    cy.get(LOGIN_INPUTS.senha).type(password, { log: false });
    cy.get(LOGIN_BUTTONS.entrar).click();
  },
};

module.exports = LoginPage;
