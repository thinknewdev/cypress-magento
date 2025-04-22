describe('Customer Account Creation', () => {
  beforeEach(() => {
    cy.visit('/customer/account/create/');
  });

  it('should show validation errors when form is submitted empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('div.mage-error').should('be.visible');
  });

  it('should create a new customer account', () => {
    // Generate random email to avoid duplicate accounts
    const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
    
    cy.get('#firstname').type('Test');
    cy.get('#lastname').type('Customer');
    cy.get('#email_address').type(randomEmail);
    cy.get('#password').type('Password123!', { sensitive: true });
    cy.get('#password-confirmation').type('Password123!', { sensitive: true });
    
    cy.get('button[type="submit"]').click();
    
    // Verify successful account creation
    cy.url().should('include', '/customer/account/');
    cy.get('.message-success').should('contain', 'Thank you for registering');
  });
});