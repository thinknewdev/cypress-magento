describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.clearCart(); // Custom command to clear cart
    cy.visit('/');
  });

  it('should add a simple product to the cart', () => {
    // Navigate to a category page
    cy.get('.navigation .level0').first().click();
    
    // Find a simple product (without options) and open its page
    cy.get('.product-item-link').first().click();
    
    // Add to cart
    cy.get('#product-addtocart-button').click();
    
    // Verify success message
    cy.get('[data-ui-id="message-success"]').should('be.visible');
    
    // Go to cart and verify product was added
    cy.visit('/checkout/cart/');
    cy.get('.cart-item').should('have.length.at.least', 1);
  });

  it('should update product quantity in cart', () => {
    // First add a product to cart
    cy.get('.navigation .level0').first().click();
    cy.get('.product-item-link').first().click();
    cy.get('#product-addtocart-button').click();
    cy.get('[data-ui-id="message-success"]').should('be.visible');
    
    // Go to cart
    cy.visit('/checkout/cart/');
    
    // Update quantity
    cy.get('input.qty').first().clear().type('2');
    cy.get('button.update-cart-item').first().click();
    
    // Wait for cart to update and verify
    cy.get('.loading-mask').should('not.be.visible');
    cy.get('input.qty').first().should('have.value', '2');
  });

  it('should remove a product from cart', () => {
    // First add a product to cart
    cy.get('.navigation .level0').first().click();
    cy.get('.product-item-link').first().click();
    cy.get('#product-addtocart-button').click();
    cy.get('[data-ui-id="message-success"]').should('be.visible');
    
    // Go to cart
    cy.visit('/checkout/cart/');
    
    // Record initial number of items
    cy.get('.cart-item').then(($items) => {
      const initialCount = $items.length;
      
      // Remove first item
      cy.get('.action-delete').first().click();
      
      // Verify item was removed
      cy.get('.cart-item').should('have.length', initialCount - 1);
    });
  });
});