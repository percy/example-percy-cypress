import { defineConfig } from 'cypress';

const sitePort = process.env.SITE_PORT || 8010;

export default defineConfig({
  video: false,
  // Cypress 16 removed Cypress.env(); the SDK reads the address `percy exec` started on from here.
  expose: { PERCY_SERVER_ADDRESS: process.env.PERCY_SERVER_ADDRESS },
  component: {
    devServer: { framework: 'react', bundler: 'vite' },
    specPattern: 'cypress/component/**/*.cy.jsx',
    supportFile: 'cypress/support/component.js'
  },
  e2e: {
    // a.lvh.me and b.lvh.me both resolve to 127.0.0.1: two origins on one site.
    baseUrl: `http://a.lvh.me:${sitePort}`,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js'
  }
});
