const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost', // Replace with your Magento URL
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    adminUrl: '/admin',
    adminUsername: 'admin',
    adminPassword: 'admin123',
    customerEmail: 'customer@example.com',
    customerPassword: 'Password123',
  },
});