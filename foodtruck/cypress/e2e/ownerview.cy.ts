describe('User view tests', () => {
    beforeEach(() => {
    cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks", {fixture: "singleTruck.json"})
      cy.visit('http://localhost:3000/')
      cy.get('.owner-button').contains("I'm A Truck Owner")
      .click()
    })

    it('should have a header and footer',() => {
        cy.get('.header').contains('Add Event')
        cy.get('.owner-footer').contains("© Dude, Where's The FoodTruck")
    })

    it('should have a button Add Event',() => {
        cy.get('.add-event-button').contains('Add Event').click()
        cy.url().should("eq", "http://localhost:3000/owner/create-event")
    })

    it(' should be able to type in edit truck name(input)',() => {
        cy.get('.name-input').type('testing').should('have.value', 'testing')
    })

    it('should be able to update truck website',() => {
        cy.get('.website-input').type('https://i.etsystatic.com/7829877/r/il/78280b/743003426/il_1588xN.743003426_kg62.jpg') .should('have.value', 'https://i.etsystatic.com/7829877/r/il/78280b/743003426/il_1588xN.743003426_kg62.jpg')
    })

    it(' should be able to add img for truck',() => {
        cy.get('.input-photo').type('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reuters.com%2Flifestyle%2Fare-you-kidding-baby-goat-wows-fans-with-22-inch-ears-2022-07-08%2F&psig=AOvVaw0bIAauroynZOrh7UV4WMe_&ust=1680709313331000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNDbwaDIkP4CFQAAAAAdAAAAABAD').should('have.value', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reuters.com%2Flifestyle%2Fare-you-kidding-baby-goat-wows-fans-with-22-inch-ears-2022-07-08%2F&psig=AOvVaw0bIAauroynZOrh7UV4WMe_&ust=1680709313331000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNDbwaDIkP4CFQAAAAAdAAAAABAD')
    })

    it("Should have options to select", () => {
        cy.get('.select-type').contains("Spanish")
        cy.get('.select-type').contains("French")
        cy.get('.select-type').contains("Italian")
        cy.get('.select-type').contains("Japanese")
        cy.get('.select-type').contains("Greek")
        cy.get('.select-type').contains("Vegan")
        cy.get('.select-type').contains("Fusion")
        cy.get('.select-type').contains("German")
    })

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


    it('should have a submit button to patch updates',() => {
        cy.fixture('singleTruck.json').then((truckDetails) => {
        cy.intercept('GET', "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2", truckDetails).as('getTruckDetails');
        cy.wait(500);
        cy.get('.name-input').type('Normal Foodtruck')
        .should('have.value', 'Normal Foodtruck')
        cy.get('.website-input').type('website')
        .should('have.value', 'website')
        cy.get('.input-photo').type('Photo')
        .should('have.value', 'Photo')
        cy.get('.select-type').select('Spanish')
        cy.get('.submit-button').click()
        cy.get('.event-card-container').contains('Normal Foodtruck')
        cy.wait(500)

        cy.fixture('editTruck.json').then((editData) => {
            cy.intercept('PATCH', 'https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2', (req) => {
                req.reply(editData);
            }).as('patchEvent');

            cy.get('.submit-button').click();

            cy.wait('@patchEvent').its('response.statusCode').should('eq', 200);
        });
    });
        
    })

    it('should display all events for a single truck',() => {
        cy.get('.all-events-container').children().should("have.length", 1)
       
    })

    it(' should be able to click an event to go to edit',() => {
        cy.get('.all-events-container > :nth-child(1)').click()
        cy.url().should("eq", "http://localhost:3000/owner/events/5")
    })

    it('should have a button Add Event',() => {
        cy.get('.add-event-button').click()
        cy.url().should("eq", "http://localhost:3000/owner/create-event")
    })
})