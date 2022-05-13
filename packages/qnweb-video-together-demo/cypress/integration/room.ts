describe('/room', function () {
  beforeEach(function () {
    cy.login();
    cy.visit('/room');
    cy.url().should('include', '/room');
  });
  /**
   * 检查页面内的元素
   */
  it('Checking page elements', function () {
    cy.get('#video').should('exist');
    cy.get('#qrcode').should('exist');
  });
});