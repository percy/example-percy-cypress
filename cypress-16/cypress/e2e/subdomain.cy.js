const A = Cypress.config('baseUrl');
const B = A.replace('//a.', '//b.');

describe('Subdomain navigation', () => {
  it('snapshots the first subdomain', () => {
    cy.visit('/');
    cy.get('#title').should('contain', 'Site A');
    cy.percySnapshot('Site A');
  });

  it('snapshots the second subdomain after the hop', () => {
    cy.visit('/');
    cy.get('#go').click();

    // Since Cypress 14 b.lvh.me is a different origin from a.lvh.me, so commands
    // that touch it run inside cy.origin().
    cy.origin(B, () => {
      cy.get('#title').should('contain', 'Site B');
    });

    // Called outside cy.origin(): the SDK captures the page through cy.origin() itself.
    cy.percySnapshot('Site B after the hop');
  });
});
