const {
  ADMIN_USUARIOS_INPUTS,
  ADMIN_USUARIOS_BUTTONS,
} = require('./elements');

const AdminUsuariosPage = {
  visitCadastrar() {
    cy.visit('/admin/cadastrarusuarios');
  },

  visitListar() {
    cy.visit('/admin/listarusuarios');
  },

  cadastrarUsuario({ nome, email, password, administrador = false }) {
    cy.get(ADMIN_USUARIOS_INPUTS.nome).clear().type(nome);
    cy.get(ADMIN_USUARIOS_INPUTS.email).clear().type(email);
    cy.get(ADMIN_USUARIOS_INPUTS.password).clear().type(password, { log: false });

    cy.get(ADMIN_USUARIOS_BUTTONS.checkbox_admin).then(($el) => {
      const checked = $el.is(':checked');
      if (administrador && !checked) cy.wrap($el).check();
      if (!administrador && checked) cy.wrap($el).uncheck();
    });

    cy.get(ADMIN_USUARIOS_BUTTONS.cadastrar).click();
  },

  linhaPorEmail(email) {
    return cy.contains('tr', email);
  },

  excluirPorEmail(email) {
    this.linhaPorEmail(email).within(() => {
      cy.contains('button', 'Excluir').click();
    });
  },
};

module.exports = AdminUsuariosPage;
