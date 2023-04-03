describe('template spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks", {fixture: "example.json"})
    cy.visit('http://localhost:3000/')
    cy.get('.user-button').contains("I'm A hungry User")
    .click()
    cy.fixture('eventDetails.json').then((truckDetails) => {
      cy.intercept('GET', "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2", truckDetails).as('getTruckDetails')
      cy.get('.trucks-container').children().first().click()
      cy.wait(500)
    })
    
  })
  it("Should have a truck name", () => {
    cy.get('h1').contains("The Food Truck We Deserve")
  })
  it("Should have a cuisine type", () => {
    cy.get('.grouped-truck-details > :nth-child(3)').contains("American")
  })
  it("Should have a city location", () => {
    cy.get('.grouped-truck-details > :nth-child(4)').contains("Denver")
  })
  it("Should have a description", () => {
    cy.get('.grouped-truck-details > :nth-child(5)').contains("This is a description")
  })
  it("Should have a weblink", () => {
    cy.get('.weblink-button').contains("Visit The Website")
  })
  it("Should have a header for the map", () => {
    cy.get('.map').contains("We Are Here!")
  })
  it("Should have a button to return to all events", () => {
    cy.get('.not-map').contains("Events")
    .click()
  })

})