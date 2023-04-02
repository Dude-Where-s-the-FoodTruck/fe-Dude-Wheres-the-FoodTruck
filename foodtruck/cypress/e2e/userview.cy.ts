describe('User view tests', () => {
    beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks", {fixture: "example.json"})
      cy.visit('http://localhost:3000/')

      cy.get('.user-button').contains("I'm A hungry User")
      .click()
    })
    it("Should have the data", () => {
        cy.get('.drop-down').contains("Denver")
        cy.get('.drop-down').contains("Englewood")
        cy.get('.drop-down').contains("Colorado Springs")
       
    })
    it("Should have four events visible", () => {
        cy.get('.trucks-container').children().should("have.length", 4)
    })
    it("Should have a name, date, and location for the events", () => {
        cy.get('.trucks-container').children().contains("Burgers, Burgers, Burgers")
        cy.contains("Normal Foodtruck")
        cy.contains("Denver")
        cy.contains("Colorado Springs")
        cy.contains("Englewood")
        cy.contains("2023-02-26")
        cy.contains("2023-02-28")
        cy.contains("2023-02-24")
    })
    it("Should be able to filter events by city", () => {
        cy.get('.drop-down').select("Denver")
        cy.get('.submit-state')
        .click()
        cy.url().should("eq", "http://localhost:3000/main")
        cy.get('.trucks-container').children().should("have.length", 2)
        cy.contains("Denver")
        cy.contains("Normal Foodtruck")
        cy.contains("Burgers, Burgers, Burgers")
        cy.contains("2023-02-28")
        cy.contains("2023-02-24")
    })
    it("Should be able to return to all", () => {
        cy.get('.reset-button')
        .click()
        cy.get('.trucks-container').children().should("have.length", 4)
    })
    it("Should show truck details when an event is clicked", () => {
        cy.get(".trucks-container").children().first().click()
    })
})