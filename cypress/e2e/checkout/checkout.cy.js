describe('Checkout Process', () => {
  beforeEach(() => {
    // Login as customer
    cy.customerLogin();
    
    // Clear cart and add a product
    cy.clearCart();
    
    // Go to homepage and add a product to cart
    cy.visit('/');
    cy.get('.navigation .level0').first().click();
    cy.get('.product-item-link').first().click();
    cy.get('#product-addtocart-button').click();
    cy.get('[data-ui-id="message-success"]').should('be.visible');
  });

  it('should proceed to checkout and fill shipping information', () => {
    // Go to checkout
    cy.visit('/checkout/cart/');
    cy.get('.checkout-methods-items .action.primary.checkout').click();
    
    // Wait for checkout page to load
    cy.url().should('include', '/checkout/');
    
    // Check if shipping address form is present (may not be if customer has default address)
    cy.get('body').then(($body) => {
      if ($body.find('#shipping-new-address-form').length > 0) {
        // Fill shipping address form
        cy.get('[name="shippingAddress.firstname"]').type('Test');
        cy.get('[name="shippingAddress.lastname"]').type('Customer');
        cy.get('[name="shippingAddress.street.0"]').type('123 Test Street');
        cy.get('[name="shippingAddress.city"]').type('Test City');
        cy.get('[name="shippingAddress.postcode"]').type('12345');
        cy.get('[name="shippingAddress.telephone"]').type('1234567890');
        
        // Select country if needed
        cy.get('[name="shippingAddress.country_id"]').select('US');
        
        // Select state if needed
        cy.get('[name="shippingAddress.region_id"]').select('California');
      }
    });
    
    // Select shipping method (first available)
    cy.get('.shipping-method-item').first().find('input[type="radio"]').check();
    
    // Click next
    cy.get('.button.action.continue.primary').click();
    
    // Verify we're on the payment step
    cy.get('.payment-group').should('be.visible');
  });

  it('should complete checkout with cash on delivery', () => {
    // Go directly to checkout
    cy.visit('/checkout');
    
    // Wait for checkout page to load
    cy.url().should('include', '/checkout/');
    
    // Fill shipping info if needed (see previous test)
    
    // Select shipping method (first available)
    cy.get('.shipping-method-item').first().find('input[type="radio"]').check();
    
    // Click next to go to payment step
    cy.get('.button.action.continue.primary').click();
    
    // Select Cash On Delivery payment method if available
    cy.get('body').then(($body) => {
      if ($body.find('#cashondelivery').length > 0) {
        cy.get('#cashondelivery').check();
      } else {
        // Otherwise select the first available payment method
        cy.get('.payment-method input[type="radio"]').first().check();
      }
    });
    
    // Check billing same as shipping
    cy.get('#billing-address-same-as-shipping-cashondelivery').check();
    
    // Place order
    cy.get('.action.primary.checkout').click();
    
    // Verify success page
    cy.url().should('include', '/checkout/onepage/success/');
    cy.get('.checkout-success').should('be.visible');
    cy.get('.checkout-success').should('contain', 'Thank you for your purchase!');
  });
});