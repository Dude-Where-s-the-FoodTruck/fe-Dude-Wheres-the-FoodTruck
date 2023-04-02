describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.user-button').contains("I'm A hungry User")
    .click()
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2", {fixture: "eventDetails.json"})
    cy.get(".trucks-container").children().first().click()
  })
  it("Should have a truck name", () => {

  })
})