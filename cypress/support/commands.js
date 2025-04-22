// ***********************************************
// Custom commands for Magento testing
// ***********************************************

// Admin login command
Cypress.Commands.add('adminLogin', (username, password) => {
  const adminUsername = username || Cypress.env('adminUsername');
  const adminPassword = password || Cypress.env('adminPassword');
  const adminUrl = Cypress.env('adminUrl');

  cy.session([adminUsername, adminPassword], () => {
    cy.visit(adminUrl);
    cy.get('#username').type(adminUsername);
    cy.get('#login').type(adminPassword, { sensitive: true });
    cy.get('.action-login').click();
    cy.get('.admin-user-account-text').should('exist');
  }, {
    validate: () => {
      cy.visit(adminUrl);
      cy.get('body').then(($body) => {
        return $body.find('.admin-user-account-text').length > 0;
      });
    },
    cacheAcrossSpecs: true
  });
});

// Customer login command
Cypress.Commands.add('customerLogin', (email, password) => {
  const customerEmail = email || Cypress.env('customerEmail');
  const customerPassword = password || Cypress.env('customerPassword');

  cy.session([customerEmail, customerPassword], () => {
    cy.visit('/customer/account/login/');
    cy.get('#email').type(customerEmail);
    cy.get('#pass').type(customerPassword, { sensitive: true });
    cy.get('#send2').click();
    cy.url().should('include', '/customer/account/');
  }, {
    validate: () => {
      cy.visit('/customer/account/');
      cy.url().should('include', '/customer/account/');
    },
    cacheAcrossSpecs: true
  });
});

// Add product to cart
Cypress.Commands.add('addProductToCart', (productUrl) => {
  cy.visit(productUrl);
  
  // Handle configurable product if present
  cy.get('body').then(($body) => {
    if ($body.find('.swatch-option').length > 0) {
      // Select the first available option for each attribute
      cy.get('.swatch-attribute').each(($attr) => {
        cy.wrap($attr).find('.swatch-option').first().click();
      });
    }
  });

  // Add to cart
  cy.get('#product-addtocart-button').click();
  cy.get('.message-success').should('be.visible');
});

// Clear cart
Cypress.Commands.add('clearCart', () => {
  cy.visit('/checkout/cart/');
  cy.get('body').then(($body) => {
    if ($body.find('.cart-item').length > 0) {
      cy.get('.action-delete').each(($deleteBtn) => {
        cy.wrap($deleteBtn).click();
        cy.wait(1000); // Wait for cart to update
      });
    }
  });
});