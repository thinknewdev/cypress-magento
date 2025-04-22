describe('Product Browsing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to a category page', () => {
    // This selector might need adjustment based on your Magento theme
    cy.get('.navigation .level0').first().click();
    
    cy.url().should('include', '/catalog/category/');
    cy.get('.category-name').should('be.visible');
    cy.get('.products.list').should('be.visible');
  });

  it('should search for a product', () => {
    const searchTerm = 'shirt';
    
    cy.get('#search').type(`${searchTerm}{enter}`);
    
    cy.url().should('include', '/catalogsearch/result/');
    cy.get('.search.results').should('be.visible');
    cy.get('.products.list').should('be.visible');
  });

  it('should navigate to a product details page', () => {
    // Go to category page first
    cy.get('.navigation .level0').first().click();
    
    // Click on the first product
    cy.get('.product-item-link').first().click();
    
    // Verify product page elements
    cy.url().should('include', '/catalog/product/view/');
    cy.get('.product-info-main').should('be.visible');
    cy.get('.product-info-price').should('be.visible');
    cy.get('#product-addtocart-button').should('be.visible');
  });
});