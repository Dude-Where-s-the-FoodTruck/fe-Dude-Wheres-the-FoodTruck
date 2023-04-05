
describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Should have two buttons', () => {
    cy.get('.user-button').contains("I'm A hungry User")
    cy.get('.owner-button').contains("I'm A Truck Owner")
  })
  it("Should have a user page", () => {
    cy.get('.user-button').contains("I'm A hungry User")
      .click()
    cy.url().should('eq', 'http://localhost:3000/main')
  })
  it("Should have an owner page", () => {
    cy.get('.owner-button').contains("I'm A Truck Owner")
      .click()
    cy.url().should('eq', 'http://localhost:3000/owner')
  })
  it("Should have an h1 tag on the main page", () => {
    cy.get('h1').contains("Pick One!")
  })
})