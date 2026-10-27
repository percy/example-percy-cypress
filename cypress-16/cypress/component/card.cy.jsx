import Card from '../../src/Card';

describe('Card', () => {
  it('renders after a click', () => {
    cy.mount(<Card title="Percy component test" />);
    cy.get('button').click();
    cy.get('.count').should('have.text', '1');

    // Snapshotted at the test viewport (500x500 by default), cropped to [data-cy-root].
    cy.percySnapshot('Card');
  });

  it('respects cy.viewport()', () => {
    cy.viewport(800, 400);
    cy.mount(<Card title="Wider viewport" />);
    cy.percySnapshot('Card at 800px');
  });

  it('lets per-snapshot options override the defaults', () => {
    cy.mount(<Card title="Responsive" />);
    cy.percySnapshot('Card at 375 and 1280', { widths: [375, 1280] });
  });
});
