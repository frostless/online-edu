import { AppMenuKeys } from '../../components/layout/appmenuconfig'

describe('Teacher add a student', () => {
    it('a student should be added successfully', function () {
        // Login
        const email = 'admin@admin.com'
        const password = 'admin'

        cy.visit('/login')

        cy.get('label:nth-of-type(2)').click()

        cy.get('input[type=email]').type(email)

        // {enter} causes the form to submit
        cy.get('input[type=password]').type(`${password}{enter}`)
        // End login

        cy.location('pathname', { timeout: 60000 }).should('include', '/index');

        // Add Student
        cy.get(`a[href="${AppMenuKeys.editStudent}"]`).click()

        cy.location('pathname', { timeout: 60000 }).should('include', `${AppMenuKeys.editStudent}`);

        const name = 'who am I'
        const studentEmail = "whoami@whoami.com"
        const address = 'nowhere'
        const studentPassword = '12345'

        cy.get('input[placeholder="Student Name"]').type(name)
        cy.get('input[type=password]').type(studentPassword)
        cy.get('input[type=email]').type(studentEmail)
        cy.get('form .ant-select-selector').click()
        cy.get('.ant-select-dropdown .ant-select-item-option-content').first().click()
        cy.get('input[placeholder="Address"]').type(address)
        cy.get('button[type="submit"]').click()
        // End add student

        // Verify
        cy.get(`a[href="${AppMenuKeys.studentList}"]`).click()
        cy.get('main .ant-input').type(`${name}{enter}`)
        cy.get('main .ant-table-row').should('exist')
        // End verify

        // Delete to cleanup
        cy.get('.ant-space .ant-space-item:nth-of-type(2)').click()
        cy.get('.ant-popover-inner button:nth-of-type(2)').click()
        // End of cleanup
    })
})