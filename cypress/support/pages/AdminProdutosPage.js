const {
  ADMIN_PRODUTOS_INPUTS,
  ADMIN_PRODUTOS_BUTTONS,
} = require('./elements');

const AdminProdutosPage = {
  visitCadastrar() {
    cy.visit('/admin/cadastrarprodutos');
  },

  visitListar() {
    cy.visit('/admin/listarprodutos');
  },

  cadastrarProduto({ nome, preco, descricao, quantidade }) {
    cy.get(ADMIN_PRODUTOS_INPUTS.nome).clear().type(nome);
    cy.get(ADMIN_PRODUTOS_INPUTS.preco).clear().type(String(preco));
    cy.get(ADMIN_PRODUTOS_INPUTS.descricao).clear().type(descricao);
    cy.get(ADMIN_PRODUTOS_INPUTS.quantidade).clear().type(String(quantidade));
    cy.get(ADMIN_PRODUTOS_BUTTONS.cadastrar).click();
  },

  linhaPorNome(nome) {
    return cy.contains('tr', nome);
  },

  excluirPorNome(nome) {
    this.linhaPorNome(nome).within(() => {
      cy.contains('button', 'Excluir').click();
    });
  },
};

module.exports = AdminProdutosPage;
