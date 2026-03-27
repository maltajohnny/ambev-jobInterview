const AdminUsuariosPage = require('../../support/pages/AdminUsuariosPage');

describe('E2E — Admin Usuários', () => {
  beforeEach(() => {
    cy.adminLogin();
  });

  it('cadastra usuário comum, valida persistência/flag e exclui da lista', () => {
    const unique = Date.now();
    const nome = `Usuario Front ${unique}`;
    const email = `user.front.${unique}@example.com`;
    const senha = 'SenhaUser123';

    AdminUsuariosPage.visitCadastrar();
    AdminUsuariosPage.cadastrarUsuario({
      nome,
      email,
      password: senha,
      administrador: false,
    });

    AdminUsuariosPage.visitListar();
    AdminUsuariosPage.linhaPorEmail(email).within(() => {
      cy.contains(nome).should('be.visible');
      cy.contains(email).should('be.visible');
      cy.contains('false').should('be.visible');
      cy.contains('button', 'Editar').should('be.visible');
      cy.contains('button', 'Excluir').should('be.visible');
    });

    cy.reload();
    AdminUsuariosPage.linhaPorEmail(email).should('exist');

    AdminUsuariosPage.excluirPorEmail(email);
    cy.contains('tr', email).should('not.exist');
  });

  it('cadastra usuário admin, valida persistência/flag true e exclui da lista', () => {
    const unique = Date.now();
    const nome = `Admin Front ${unique}`;
    const email = `admin.front.${unique}@example.com`;
    const senha = 'SenhaAdmin123';

    AdminUsuariosPage.visitCadastrar();
    AdminUsuariosPage.cadastrarUsuario({
      nome,
      email,
      password: senha,
      administrador: true,
    });

    AdminUsuariosPage.visitListar();
    AdminUsuariosPage.linhaPorEmail(email).within(() => {
      cy.contains(nome).should('be.visible');
      cy.contains(email).should('be.visible');
      cy.contains('true').should('be.visible');
    });

    AdminUsuariosPage.excluirPorEmail(email);
    cy.contains('tr', email).should('not.exist');
  });
});
