describe('Customer Login', () => {
  beforeEach(() => {
    cy.visit('/customer/account/login/');
  });

  it('should not login with incorrect credentials', () => {
    cy.get('#email').type('wrong@example.com');
    cy.get('#pass').type('wrongpassword', { sensitive: true });
    cy.get('#send2').click();
    
    cy.get('.message-error').should('be.visible')
      .and('contain', 'The account sign-in was incorrect');
  });

  it('should login successfully with correct credentials', () => {
    cy.get('#email').type(Cypress.env('customerEmail'));
    cy.get('#pass').type(Cypress.env('customerPassword'), { sensitive: true });
    cy.get('#send2').click();
    
    cy.url().should('include', '/customer/account/');
    cy.get('.box-information .box-content').should('contain', Cypress.env('customerEmail'));
  });

  it('should use the custom login command', () => {
    cy.customerLogin();
    cy.url().should('include', '/customer/account/');
  });
});