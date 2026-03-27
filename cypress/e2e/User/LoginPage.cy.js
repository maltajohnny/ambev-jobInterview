const { isPipeline, isLocal } = require('../../utils/runtimeEnv');
const LoginPage = require('../../support/pages/LoginPage');
const { LOGIN_INPUTS } = require('../../support/pages/elements');

describe('E2E — Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('expõe helpers de ambiente (local vs pipeline)', () => {
    expect(typeof isPipeline()).to.eq('boolean');
    expect(typeof isLocal()).to.eq('boolean');
  });

  it('garante usuário a partir do cypress.env e autentica (cria na web se ainda não existir)', () => {
    cy.login();
    cy.url({ timeout: 15000 }).should('not.include', '/login');
  });

  it('a) usuário válido com senha falsa exibe alerta de credenciais inválidas', () => {
    LoginPage.login(Cypress.env('USER_EMAIL'), 'senhaInvalida123');
    cy.contains('Email e/ou senha inválidos').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('b) usuário inválido com senha verdadeira exibe alerta de credenciais inválidas', () => {
    LoginPage.login(
      `invalido.${Date.now()}@example.com`,
      Cypress.env('USER_PASSWORD'),
    );
    cy.contains('Email e/ou senha inválidos').should('be.visible');
    cy.url().should('include', '/login');
  });

  it("c) e-mail sem '@' (4 chars) mostra mensagem nativa de validação", () => {
    cy.get(LOGIN_INPUTS.email).clear().type('test');
    cy.get(LOGIN_INPUTS.senha).clear().type('qualquer123', { log: false });
    cy.get('[data-testid="entrar"]').click();

    cy.get(LOGIN_INPUTS.email).then(($input) => {
      const validityMessage = $input[0].validationMessage;
      expect($input[0].checkValidity()).to.eq(false);
      expect(validityMessage).to.include("Please include an '@'");
      expect(validityMessage).to.include("'test' is missing an '@'");
    });
  });
});
