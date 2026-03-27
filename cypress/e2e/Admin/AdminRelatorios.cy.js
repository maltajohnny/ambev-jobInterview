describe('E2E — Admin Relatórios', () => {
  /**
   * Página ainda em construção no ambiente alvo.
   */
  it.skip('acessa /admin/relatorios', () => {
    cy.adminLogin();
    cy.visit('/admin/relatorios');
    cy.contains(/constru|aguarde/i).should('be.visible');
  });
});
