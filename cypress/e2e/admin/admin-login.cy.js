describe('Admin Login', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('adminUrl'));
  });

  it('should not login with incorrect credentials', () => {
    cy.get('#username').type('wrongadmin');
    cy.get('#login').type('wrongpassword', { sensitive: true });
    cy.get('.action-login').click();
    
    cy.get('.message-error').should('be.visible')
      .and('contain', 'The account sign-in was incorrect');
  });

  it('should login successfully with correct admin credentials', () => {
    cy.get('#username').type(Cypress.env('adminUsername'));
    cy.get('#login').type(Cypress.env('adminPassword'), { sensitive: true });
    cy.get('.action-login').click();
    
    // Verify admin dashboard is loaded
    cy.url().should('include', '/admin/dashboard/');
    cy.get('.admin-user-account-text').should('be.visible');
  });

  it('should use the custom admin login command', () => {
    cy.adminLogin();
    cy.url().should('include', '/admin/');
    cy.get('.admin-user-account-text').should('be.visible');
  });
});