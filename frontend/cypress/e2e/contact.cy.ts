describe('Contact Form', () => {
    beforeEach(() => {
        cy.visit('/contact') 
    })

    it('should display the contact form', () => {
        cy.get('form').should('be.visible')
    })

    it('should fill in the contact form and submit successfully', () => {
        cy.get('[data-test-id="name-input"]').type('John Doe')
        cy.get('[data-test-id="email-input"]').type('johndoe@example.com')
        cy.get('[data-test-id="message-input"]').type('This is a test message')
        cy.get('[data-test-id="submit-button"]').click()

        cy.get('[data-test-id="success-message"]').should('be.visible')
    })

    it('should display an error message if the email is invalid', () => {
        cy.get('[data-test-id="name-input"]').type('John Doe')
        cy.get('[data-test-id="email-input"]').type('johndoe@example')
        cy.get('[data-test-id="message-input"]').type('This is a test message')

        cy.get('[data-test-id="error-email"]').should('be.visible')
})

    it('should display an error message if required fields are not filled', () => {
        cy.get('[data-test-id="name-input"]').type('John Doe')
        cy.get('[data-test-id="name-input"]').type('{selectall}{backspace}') // Clear the name field

        cy.get('[data-test-id="error-name"]').should('be.visible')
    })
})