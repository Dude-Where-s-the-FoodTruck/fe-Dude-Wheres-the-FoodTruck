describe('User view tests', () => {
    beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_truc", {fixture: "example.json"})
      cy.visit('http://localhost:3000/')

      cy.get('.owner-button').contains("I'm A Truck Owner")
      .click()
    })

    it('should have a header and footer',() => {
        cy.get('.header').contains('Add Event')
        cy.get('.footer').contains("© Dude, Where's The FoodTruck")
    })

    // it('should have a button Add Event',() => {
    //     cy.get('.add-event-button').contains('Add Event').click()
    //     cy.url().should("eq", "http://localhost:3000/owner/create-event")
    // })

    // it(' should be able to type in edit truck name(input)',() => {
    //     cy.get('.name-input').type('testing')
    // })

    // it('should be able to update truck website',() => {
    //     cy.get('.website-input').type('https://i.etsystatic.com/7829877/r/il/78280b/743003426/il_1588xN.743003426_kg62.jpg')
    // })

    // it(' should be able to add img for truck',() => {
    //     cy.get('label').contains('Choose a file')
    // })

    // it("Should have options to select", () => {
    //     cy.get('.select-type').contains("Spanish")
    //     cy.get('.select-type').contains("French")
    //     cy.get('.select-type').contains("Italian")
    //     cy.get('.select-type').contains("Japanese")
    //     cy.get('.select-type').contains("Greek")
    //     cy.get('.select-type').contains("Vegan")
    //     cy.get('.select-type').contains("Fusion")
    //     cy.get('.select-type').contains("German")
    // })

    it(' should have a cancel button that clears the input fields',() => {
        cy.get('.name-input').type('testing')
        .should('have.value', 'testing')
        cy.get('.website-input').type('website')
        .should('have.value', 'website')
        cy.get('.cancel-button').click()
        cy.get('.cancel-button')
        cy.get('.name-input').should('have.value', '')
        cy.get('.website-input').should('have.value', '')
    })

    // it('should have a submit button to patch updates',() => {
        
        
    // })

    // it('should display all events for a single truck',() => {
        
        
    // })

    // it(' should be able to click an event to go to edit',() => {
        
        
    // })

    // it('should have a button Add Event',() => {
        
        
    // })
})