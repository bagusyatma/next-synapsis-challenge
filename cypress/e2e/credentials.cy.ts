/**
 * - Credentials spec
 *   - should display credentials page correctly
 *   - should display alert when name and token are empty
 *   - should display homepage when name and token are correct
 */

describe('Credentials spec', () => {
  const TEST_NAME = 'John Doe';
  const TEST_TOKEN = 'eae9fdc28f7fac0fdff87fbc7766ec89cf47a976db65911078ef6d5e43d84e48';

  it('should display credentials page correctly', () => {
    cy.visit('http://localhost:3000/');

    // check welcome text is visible
    cy.contains('Please enter your name and token to continue.').should('be.visible');

    // check name input & token input is visible
    cy.get('#name').should('be.visible');
    cy.get('#token').should('be.visible');

    // check submit button is visible
    cy.get('#submit-button').should('be.visible');
  });

  it('should display alert when name and token are empty', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#submit-button').click();
    cy.contains('Please enter your name').should('be.visible');
    cy.contains('Please enter your token').should('be.visible');
  });

  it('should display homepage when name and token are correct', () => {
    cy.visit('http://localhost:3000/');

    // Check modal is visible initially
    cy.get('.ant-modal').should('be.visible');

    // Fill in credentials
    cy.get('#name').type(TEST_NAME);
    cy.get('#token').type(TEST_TOKEN);

    cy.get('#submit-button').click();

    // Verify successful login
    cy.contains(`Hai, ${TEST_NAME}`).should('be.visible');
  });
});
