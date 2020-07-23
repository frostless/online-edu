describe('Validate manager adding effects', () => {
    it('a manager should be added successfully with all effects changed correctly', function () {
        const email = 'manager@manager.com'
        const password = '123456'

        cy.visit('/login')

        cy.get('label:nth-of-type(3)').click()

        cy.get('input[type=email]').type(email)

        // {enter} causes the form to submit
        cy.get('input[type=password]').type(`${password}{enter}`)

        cy.get('div["aria-owns"="manager$Menu"]').click()

        // const name = 'who am I'
        // const studentEmail = "whoami@whoami.com"
        // const address = 'nowhere'

        // cy.get('input[placeholder="Student Name"]').type(name)
        // cy.get('input[type=email]').type(studentEmail)
        // cy.get('.ant-select').click()    
        // cy.get('.ant-select-arrow').click()   
        // cy.get('input[placeholder="Address"]').type(address)
    })
})