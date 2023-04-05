describe('User view tests', () => {
    beforeEach(() => {
        cy.intercept("GET", "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks", { fixture: "allTrucks.json" })
        cy.visit('http://localhost:3000/')
        cy.get('.owner-button').contains("I'm A Truck Owner")
            .click()
        cy.fixture('singleTruck.json').then((truckDetails) => {
            cy.intercept('GET', "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2", truckDetails).as('getTruckDetails')
            cy.get('.all-events-container > :nth-child(1)').click()
            cy.wait(500)
        })
    })


    it('should have a header and footer', () => {
        cy.get('.header').contains('Add Event')
        cy.get('.owner-footer').contains("© Dude, Where's The FoodTruck")
    })


    it('date, start time, end time, description, street, city, state, zip', () => {
        cy.get('#event_date').type('2023-05-13')
            .should('have.value', '2023-05-13')
        cy.get('#start_time').type('07:05:00')
            .should('have.value', '07:05:00')
        cy.get('#end_time').type('20:05:00')
            .should('have.value', '20:05:00')
        cy.get('#description').type('THIS THING')
            .should('have.value', 'THIS THING')
        cy.get('#street').type('490 w Colfax')
            .should('have.value', '490 w Colfax')
        cy.get('#city').type('Denver')
            .should('have.value', 'Denver')
        cy.get('.submit-event').click()
        cy.wait(500)
        cy.get('.all-events-container > :nth-child(1)').click()
    })

    it('should patch event data', () => {
        cy.fixture('singleTruck.json').then((truckDetails) => {
            cy.intercept('GET', "https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2", truckDetails).as('getTruckDetails');
            cy.wait(500);

            cy.get('#event_date').type('2023-05-13').should('have.value', '2023-05-13');
            cy.get('#start_time').type('07:05:00').should('have.value', '07:05:00');
            cy.get('#end_time').type('20:05:00').should('have.value', '20:05:00');
            cy.get('#description').type('Me Likey').should('have.value', 'Me Likey');
            cy.get('#street').type('490 w Colfax').should('have.value', '490 w Colfax');
            cy.get('#city').type('Denver').should('have.value', 'Denver');
            cy.wait(500);

            cy.fixture('patch.json').then((patchData) => {
                cy.intercept('PATCH', 'https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks/2/events/5', (req) => {
                    req.reply(patchData);
                }).as('patchEvent');

                cy.get('.submit-event').click();

                cy.wait('@patchEvent').its('response.statusCode').should('eq', 200);
            });
        });
    });


    it('should have button UpdateEvent', () => {
        cy.get('.submit-event').contains('Update Event')
    })

    it('should have button Back to home', () => {
        cy.get('.back-to-owner').click()
        cy.url().should("eq", "http://localhost:3000/owner")
    })
})