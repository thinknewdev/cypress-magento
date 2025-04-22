describe('Admin Products Management', () => {
  beforeEach(() => {
    cy.adminLogin();
    cy.visit(Cypress.env('adminUrl') + '/catalog/product/');
  });

  it('should display product grid', () => {
    cy.get('.admin__data-grid-wrap').should('be.visible');
    cy.get('.admin__data-grid-header').should('be.visible');
    cy.get('.data-grid').should('be.visible');
  });

  it('should filter products by name', () => {
    // Clear any existing filters
    cy.get('button[data-action="grid-filter-reset"]').click();
    
    // Open filter
    cy.get('.admin__data-grid-filters-current').click();
    
    // Type in the Name filter
    cy.get('input[name="name"]').type('Test');
    
    // Apply filter
    cy.get('button[data-action="grid-filter-apply"]').click();
    
    // Wait for grid to update
    cy.get('.admin__data-grid-loading-mask').should('not.be.visible');
    
    // Verify filtered results
    cy.get('.data-grid-cell-content').should('contain', 'Test');
  });

  it('should view product details', () => {
    // Open the first product
    cy.get('.data-grid-cell-content').first().click();
    
    // Verify product edit form is displayed
    cy.get('.page-title').should('contain', 'Edit Product');
    cy.get('#product_info_tabs').should('be.visible');
    cy.get('#product-edit-form').should('be.visible');
  });

  // Note: This test is commented out because it would create actual products in your store
  // Uncomment and adjust as needed for your testing purposes
  /*
  it('should create a simple product', () => {
    // Click Add Product button
    cy.get('#add_new_product').click();
    
    // Select Simple Product
    cy.get('[data-value="simple"]').click();
    
    // Wait for product form to load
    cy.get('#product_info_tabs').should('be.visible');
    
    // Fill in required fields
    const productName = 'Cypress Test Product ' + Date.now();
    cy.get('#product_name').type(productName);
    cy.get('#sku').type('cypress-test-' + Date.now());
    cy.get('#price').type('99.99');
    
    // Select attribute set if needed
    cy.get('#attribute_set_id').select('Default');
    
    // Set quantity
    cy.get('#inventory_qty').clear().type('100');
    
    // Enable product
    cy.get('#status').select('1');
    
    // Save product
    cy.get('#save-button').click();
    
    // Verify success message
    cy.get('.message-success').should('be.visible')
      .and('contain', 'You saved the product');
  });
  */
});