describe('Teacher add a student', () => {
    it('a student should be added successfully', function () {
        const email = 'admin@admin.com'
        const password = 'admin'

        cy.visit('/login')

        cy.get('label:nth-of-type(2)').click()

        cy.get('input[type=email]').type(email)

        // {enter} causes the form to submit
        cy.get('input[type=password]').type(`${password}{enter}`)

        cy.get('a[href="/students/editstudent"]').click()

        const name = 'who am I'
        const studentEmail = "whoami@whoami.com"
        const address = 'nowhere'

        cy.get('input[placeholder="Student Name"]').type(name)
        cy.get('input[type=email]').type(studentEmail)
        cy.get('.ant-select').click()    
        cy.get('.ant-select-arrow').click()   
        cy.get('input[placeholder="Address"]').type(address)
    })
})