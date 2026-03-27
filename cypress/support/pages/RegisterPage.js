const {
  REGISTER_INPUTS,
  REGISTER_CHECKBOXES,
  REGISTER_BUTTONS,
} = require('./elements');

const RegisterPage = {
  visit() {
    cy.visit('/cadastrarusuarios');
  },

  register({ nome, email, password, asAdmin = false }) {
    cy.get(REGISTER_INPUTS.nome).clear();
    cy.get(REGISTER_INPUTS.nome).type(nome);
    cy.get(REGISTER_INPUTS.email).clear();
    cy.get(REGISTER_INPUTS.email).type(email);
    cy.get(REGISTER_INPUTS.password).clear();
    cy.get(REGISTER_INPUTS.password).type(password, { log: false });

    cy.get(REGISTER_CHECKBOXES.administrador).then(($el) => {
      const checked = $el.is(':checked');
      if (asAdmin && !checked) {
        cy.wrap($el).check();
      }
      if (!asAdmin && checked) {
        cy.wrap($el).uncheck();
      }
    });

    cy.get(REGISTER_BUTTONS.cadastrar).click();
  },
};

module.exports = RegisterPage;
