const AdminProdutosPage = require('../../support/pages/AdminProdutosPage');
const {
  ADMIN_PRODUTOS_INPUTS,
  ADMIN_PRODUTOS_BUTTONS,
} = require('../../support/pages/elements');

describe('E2E — Admin Produtos', () => {
  beforeEach(() => {
    cy.adminLogin();
  });

  it('A) valida labels/inputs da tela de cadastrar produtos', () => {
    AdminProdutosPage.visitCadastrar();
    cy.contains('h1', 'Cadastro de Produtos').should('be.visible');

    cy.contains('label', 'Nome: *').should('be.visible');
    cy.get(ADMIN_PRODUTOS_INPUTS.nome).should('be.visible');

    cy.contains('label', 'Preço: *').should('be.visible');
    cy.get(ADMIN_PRODUTOS_INPUTS.preco).should('be.visible');

    cy.contains('label', 'Descrição: *').should('be.visible');
    cy.get(ADMIN_PRODUTOS_INPUTS.descricao).should('be.visible');

    cy.contains('label', 'Quantidade: *').should('be.visible');
    cy.get(ADMIN_PRODUTOS_INPUTS.quantidade).should('be.visible');

    cy.contains('label', 'Imagem: *').should('be.visible');
    cy.get(ADMIN_PRODUTOS_INPUTS.imagem).should('be.visible');

    cy.get(ADMIN_PRODUTOS_BUTTONS.cadastrar).should('be.visible');
  });

  it.skip('A.1) upload de imagem no cadastro de produto (pendente)', () => {
    expect(true).to.eq(true);
  });

  it('cadastra produto, valida na listagem e exclui', () => {
    const unique = Date.now();
    const nome = `Produto Front ${unique}`;
    const preco = 470;
    const descricao = `Descricao ${unique}`;
    const quantidade = 3;

    AdminProdutosPage.visitCadastrar();
    AdminProdutosPage.cadastrarProduto({
      nome,
      preco,
      descricao,
      quantidade,
    });

    AdminProdutosPage.visitListar();
    AdminProdutosPage.linhaPorNome(nome).within(() => {
      cy.contains(String(preco)).should('be.visible');
      cy.contains(descricao).should('be.visible');
      cy.contains(String(quantidade)).should('be.visible');
      cy.contains('button', 'Editar').should('be.visible');
      cy.contains('button', 'Excluir').should('be.visible');
    });

    AdminProdutosPage.excluirPorNome(nome);
    cy.contains('tr', nome).should('not.exist');
  });
});
