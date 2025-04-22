describe('Admin Orders Management', () => {
  beforeEach(() => {
    cy.adminLogin();
    cy.visit(Cypress.env('adminUrl') + '/sales/order/');
  });

  it('should display orders grid', () => {
    cy.get('.admin__data-grid-wrap').should('be.visible');
    cy.get('.admin__data-grid-header').should('be.visible');
    cy.get('.data-grid').should('be.visible');
  });

  it('should filter orders by ID', () => {
    // Clear any existing filters
    cy.get('button[data-action="grid-filter-reset"]').click();
    
    // Open filters
    cy.get('.admin__data-grid-filters-current').click();
    
    // Get the first order ID from the grid if available
    cy.get('body').then(($body) => {
      if ($body.find('.data-grid tbody tr').length > 0) {
        // Get ID from first row
        const firstOrderId = $body.find('.data-grid tbody tr:first-child td:first-child').text().trim();
        
        // Type in the ID filter
        cy.get('input[name="increment_id"]').type(firstOrderId);
        
        // Apply filter
        cy.get('button[data-action="grid-filter-apply"]').click();
        
        // Wait for grid to update
        cy.get('.admin__data-grid-loading-mask').should('not.be.visible');
        
        // Verify filtered results
        cy.get('.data-grid tbody tr').should('have.length', 1);
        cy.get('.data-grid tbody tr:first-child td:first-child').should('contain', firstOrderId);
      } else {
        // Skip test if no orders are available
        cy.log('No orders available to test filtering');
      }
    });
  });

  it('should view order details if orders exist', () => {
    cy.get('body').then(($body) => {
      if ($body.find('.data-grid tbody tr').length > 0) {
        // Click on first order
        cy.get('.data-grid tbody tr:first-child td:first-child').click();
        
        // Verify order view page is displayed
        cy.get('.page-title').should('contain', 'Order');
        cy.get('.order-view-billing-shipping').should('be.visible');
        cy.get('.order-totals').should('be.visible');
      } else {
        // Skip test if no orders are available
        cy.log('No orders available to test viewing');
      }
    });
  });

  // Note: This test is for checking filter by customer name
  it('should filter orders by customer name', () => {
    cy.get('body').then(($body) => {
      if ($body.find('.data-grid tbody tr').length > 0) {
        // Clear any existing filters
        cy.get('button[data-action="grid-filter-reset"]').click();
        
        // Get the customer name from the first row if available
        const customerNameCell = $body.find('.data-grid tbody tr:first-child td:nth-child(4)');
        
        if (customerNameCell.length > 0) {
          const customerName = customerNameCell.text().trim();
          
          // Open filters
          cy.get('.admin__data-grid-filters-current').click();
          
          // Type in the customer name filter
          cy.get('input[name="billing_name"]').type(customerName);
          
          // Apply filter
          cy.get('button[data-action="grid-filter-apply"]').click();
          
          // Wait for grid to update
          cy.get('.admin__data-grid-loading-mask').should('not.be.visible');
          
          // Verify filtered results contain the customer name
          cy.get('.data-grid tbody tr:first-child td:nth-child(4)').should('contain', customerName);
        } else {
          cy.log('Customer name cell not found in the grid');
        }
      } else {
        cy.log('No orders available to test filtering by customer name');
      }
    });
  });
});