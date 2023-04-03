describe('User view tests', () => {
    beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_truc", {fixture: "example.json"})
      cy.visit('http://localhost:3000/')

      cy.get('.owner-button').contains("I'm A Truck Owner")
      .click()
      cy.get('.add-event-button').click()
    })


    it('should have a header and footer',() => {
        cy.get('.header').contains('Add Event')
        cy.get('.footer').contains("© Dude, Where's The FoodTruck")
    })
    
    
    // it('date, start time, end time, description, street, city, state, zip',() => {
    //     // cy.get('#event_date').type('05/05/2023')
    //     // .should('have.value', '05/05/2023')
    //     // cy.get('#start_time').type('07:05 am')
    //     // .should('have.value', '07:05 am')
    //     // cy.get('#end_time').type('08:05 pm')
    //     // .should('have.value', '08:05 pm')
    //     cy.get('#description').type('around the corner and up the way')
    //     .should('have.value', 'around the corner and up the way')
    //     cy.get('#street').type('123')
    //     .should('have.value', '123')
    //     cy.get('#city').type('Aurora')
    //     .should('have.value', 'Aurora')
    //     cy.get('#state').type('CO')
    //     .should('have.value', 'CO')
    //     cy.get('#zip').type('80011')
    //     .should('have.value', '80011')
    // })

    // // it('should be able to patch event',() => {
    
    // // })

    // it('should have button Create Event',() => {
    //     cy.get('.create-button').contains('Create Event')
    // })

    // it('should have button Back to home',() => {
    //     cy.get('.back-to-owner').click()
    //     cy.url().should("eq", "http://localhost:3000/owner")
    // })

    
})