describe('template spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks", {fixture: "example.json"})
    cy.visit('http://localhost:3000/')
    cy.get('.user-button').contains("I'm A hungry User")
    .click()
    
  })
  it("Should have a truck name", () => {
    cy.fixture('eventDetails.json').then((truckDetails) => {
      cy.intercept('GET', "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2", truckDetails).as('getTruckDetails')
      cy.get('.trucks-container').children().first().click()
      cy.wait(500)
    })
  })
})