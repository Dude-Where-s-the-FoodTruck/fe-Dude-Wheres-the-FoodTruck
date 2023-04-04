
describe('User view tests', () => {
    beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_truc", {fixture: "example.json"})
      cy.visit('http://localhost:3000/')

      cy.get('.owner-button').contains("I'm A Truck Owner")
      .click()
      cy.get('.all-events-container > :nth-child(1)').click()
    })


    it('should have a header and footer',() => {
        cy.get('.header').contains('Add Event')
        cy.get('.footer').contains("© Dude, Where's The FoodTruck")
    })
    
    
    it('date, start time, end time, description, street, city, state, zip',() => {
        cy.get('#event_date').type('2023-05-13')
        .should('have.value', '2023-05-13')
        cy.get('#start_time').type('07:05:00')
        .should('have.value', '07:05:00')
        cy.get('#end_time').type('20:05:00')
        .should('have.value', '20:05:00')
        cy.get('#description').type('around the corner and up the way')
        .should('have.value', 'around the corner and up the way')
        cy.get('#street').type('490 w colfax')
        .should('have.value', '490 w colfax')
        cy.get('#city').type('Denver')
        .should('have.value', 'Denver')
    })

    it('should have button UpdateEvent',() => {
        cy.get('.submit-event').contains('Update Event')
    })

    it('should have button Back to home',() => {
        cy.get('.back-to-owner').click()
        cy.url().should("eq", "http://localhost:3000/owner")
    })

    it('should be able to patch event',() => {
        cy.get('#event_date').type('2023-05-13')
        .should('have.value', '2023-05-13')
        cy.get('#start_time').type('07:05:00')
        .should('have.value', '07:05:00')
        cy.get('#end_time').type('20:05:00')
        .should('have.value', '20:05:00')
        cy.get('#description').type('around the corner')
        .should('have.value', 'around the corner')
        cy.get('#street').type('490 w colfax')
        .should('have.value', '490 w colfax')
        cy.get('#city').type('Denver')
        .should('have.value', 'Denver')
        cy.get('.submit-event').click()

        cy.get('.event-details > div > :nth-child(2)').contains('Denver')
        cy.get('.event-details > div > :nth-child(3)').contains('around the corner')
        cy.get('.event-details > div > :nth-child(4)').contains('2023-05-13')
        cy.get('.event-details > div > :nth-child(5)').contains('07:05:00')
        cy.get('.event-details > div > :nth-child(6)').contains('20:05:00')
    })
})