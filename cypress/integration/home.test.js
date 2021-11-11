describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('should extend the table after a successful search', () => {
    cy.get('#forecastTable').find('tr').should('have.length', 0)
    cy.get('#city').type('London');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 2)
    cy.get('#city').type('Budapest');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 4)
  });

  it('should show error on invalid city - empty table', () => {
    cy.get('#forecastErrorMessage').should('not.exist');
    cy.get('#city').type('TotalInvalid');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 0)
    cy.get('#forecastErrorMessage').should('exist');
  });

  it('should show error on invalid city', () => {
    cy.get('#city').type('London');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 2)
    cy.get('#forecastErrorMessage').should('not.exist');
    cy.get('#city').type('TotalInvalid');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 2)
    cy.get('#forecastErrorMessage').should('exist');
  });

  it('error should disappear after successful search', () => {
    cy.get('#forecastErrorMessage').should('not.exist');
    cy.get('#city').type('TotalInvalid');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 0)
    cy.get('#forecastErrorMessage').should('exist');
    cy.get('#city').type('London');
    cy.get('#citySearchButton').click();
    cy.get('#forecastTable').find('tr').should('have.length', 2)
    cy.get('#forecastErrorMessage').should('not.exist');
  });

})
