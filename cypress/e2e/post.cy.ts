describe('Post spec', () => {
  const TEST_NAME = 'John Doe';
  const TEST_TOKEN = 'eae9fdc28f7fac0fdff87fbc7766ec89cf47a976db65911078ef6d5e43d84e48';

  beforeEach(() => {
    cy.visit('http://localhost:3000/');

    // check modal is visible initially
    cy.get('.ant-modal').should('be.visible');

    // Fill in credentials
    cy.get('#name').type(TEST_NAME);
    cy.get('#token').type(TEST_TOKEN);

    cy.get('#submit-button').click();
  });

  it('should display post page correctly', () => {
    // check search input is visible
    cy.get('#search-input').should('be.visible');

    // check list post is visible
    cy.get('a[href^="/post/"]').should('have.length.at.least', 1);

    // check load more button is visible
    cy.get('button').contains('Load More').should('be.visible');

    // check create post button is visible
    cy.get('#create-post-button').should('be.visible');
  });

  // Create Post
  it('should display create post form correctly', () => {
    cy.get('#create-post-button').click();

    // check title is visible
    cy.contains('Create Post').should('be.visible');

    // check anonymous name is visible
    cy.get('.ant-select-selector').should('be.visible');

    // check title is visible
    cy.get('#title').should('be.visible');

    // check content is visible
    cy.get('#body').should('be.visible');

    // check submit button is visible
    cy.get('#posting-button').should('be.visible');
  });

  it('should show validation error when submitting with empty form', () => {
    cy.get('#create-post-button').click();

    // check validation error
    cy.get('#posting-button').click();

    cy.contains('Please select anonymous name').should('be.visible');
    cy.contains('Please enter title').should('be.visible');
    cy.contains('Please enter content').should('be.visible');
  });

  it('should show validation error when submitting with invalid form', () => {
    const longTitle = 'a'.repeat(201);
    const longBody = 'a'.repeat(501);

    cy.get('#create-post-button').click();

    cy.get('#select-anonymous-name').click();
    cy.get('.ant-select-item').first().should('be.visible').click();

    cy.get('#title').type(longTitle);
    cy.get('#body').type(longBody);

    cy.get('#posting-button').click();

    cy.contains('Title must be less than 200 characters').should('be.visible');
    cy.contains('Content must be less than 500 characters').should('be.visible');
  });

  it('should create post successfully', () => {
    cy.get('#create-post-button').click();

    cy.get('#select-anonymous-name').click();
    cy.get('.ant-select-item').first().should('be.visible').click();

    cy.get('#title').type('Test Post');

    cy.get('#body').type('This is a test post');

    cy.get('#posting-button').click();

    cy.contains('Post created successfully').should('be.visible');
    cy.contains('Test Post').should('be.visible');
  });

  it('should display post detail page correctly', () => {
    cy.get('a[href^="/post/"]').first().click();

    cy.contains('Post').should('be.visible');
    cy.get('#update-post-button').should('be.visible');
    cy.get('#delete-post-button').should('be.visible');
    cy.get('#post-title').should('be.visible');
    cy.get('#post-body').should('be.visible');
  });

  it('should display update post form correctly', () => {
    cy.get('a[href^="/post/"]').first().click();

    cy.get('#update-post-button').click();

    cy.contains('Update Post').should('be.visible');

    // check anonymous name is visible
    cy.get('.ant-select-selector').should('be.visible');

    // check title is visible
    cy.get('#title').should('be.visible');

    // check content is visible
    cy.get('#body').should('be.visible');

    // check submit button is visible
    cy.get('#posting-button').should('be.visible');
  });

  it('should update post form is filled with post data', () => {
    cy.get('#create-post-button').click();

    cy.get('#select-anonymous-name').click();
    cy.get('.ant-select-item').first().should('be.visible').click();

    cy.get('#title').type('Test Post');

    cy.get('#body').type('This is a test post');

    cy.get('#posting-button').click();

    cy.get('a[href^="/post/"]').first().click();

    cy.get('#update-post-button').click();

    cy.get('#title').should('have.value', 'Test Post');
    cy.get('#body').should('have.value', 'This is a test post');
  });

  it('should update post successfully', () => {
    cy.get('a[href^="/post/"]').first().click();

    cy.get('#update-post-button').click();

    cy.get('#title').clear().type('Updated Post');
    cy.get('#body').clear().type('This is an updated post');

    cy.get('#posting-button').click();

    cy.contains('Post updated successfully').should('be.visible');
    cy.contains('Updated Post').should('be.visible');
  });

  it('should delete post successfully', () => {
    cy.get('a[href^="/post/"]').first().click();

    cy.get('#delete-post-button').click();
    cy.get('.ant-modal').should('be.visible');
    cy.get('#confirm-delete-button').click();

    cy.contains('Post deleted successfully').should('be.visible');
  });
});
