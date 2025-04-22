# Magento 2 Cypress Test Suite

This repository contains a Cypress test suite for Magento 2 e-commerce platform.

## Structure

The test suite is organized into the following sections:

- Customer: Account creation, login, and account management
- Catalog: Product browsing, searching, and viewing
- Checkout: Cart management and checkout process
- Admin: Admin login, product management, and order management

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure your Magento URL:

Edit the `cypress.config.js` file and update the `baseUrl` to point to your Magento 2 installation.

```js
baseUrl: 'http://your-magento-domain.com',
```

3. Set environment variables:

Update the environment variables in `cypress.config.js` with your own credentials:

```js
env: {
  adminUrl: '/admin',
  adminUsername: 'your-admin-username',
  adminPassword: 'your-admin-password',
  customerEmail: 'your-customer-email@example.com',
  customerPassword: 'your-customer-password',
},
```

## Running Tests

### Open Cypress UI

```bash
npm run cypress:open
```

### Run all tests headlessly

```bash
npm test
```

### Run specific test suites

```bash
# Run customer tests
npm run test:customer

# Run catalog tests
npm run test:catalog

# Run checkout tests
npm run test:checkout

# Run admin tests
npm run test:admin
```

## Custom Commands

The test suite includes several custom Cypress commands:

- `cy.adminLogin()`: Log in to the Magento admin panel
- `cy.customerLogin()`: Log in as a customer
- `cy.addProductToCart(productUrl)`: Add a specific product to the cart
- `cy.clearCart()`: Clear all items from the cart

## Notes for Test Maintenance

1. Selectors may need to be updated based on your specific Magento theme.
2. Form field names and IDs may vary depending on your Magento version.
3. For admin tests that create or modify data, be careful about running them in production environments.

## Extending the Test Suite

To add new tests:

1. Create a new file in the appropriate directory under `cypress/e2e/`
2. Follow the existing patterns for setting up before and after hooks
3. Use the custom commands where appropriate to simplify test logic

## Troubleshooting

- If tests fail due to timing issues, consider increasing the timeout values in `cypress.config.js`
- Check that your selectors match your Magento theme
- Verify that the test user accounts have the necessary permissions