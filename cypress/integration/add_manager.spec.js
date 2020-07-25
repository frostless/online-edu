import { AppMenuKeys, PermittedMenuMapToMenuKey } from '../../components/layout/appmenuconfig'
import User from '../../lib/user'

describe('Validate manager adding effects', () => {
    it('a manager should be added successfully with all effects changed correctly', function () {
        // Log in
        const email = 'manager@manager.com'
        const password = '123456'

        cy.visit('login')

        cy.get('label:nth-of-type(3)').click()
        cy.get('input[type=email]').type(email)
        cy.get('input[type=password]').type(`${password}{enter}`)
        // End log in

        cy.location('pathname', { timeout: 60000 }).should('include', '/home');

        // Add manager
        cy.get('.ant-menu-submenu:nth-of-type(5)').click()
        cy.get(`a[href="${AppMenuKeys.managerList}"]`).click()

        cy.location('pathname', { timeout: 60000 }).should('include', `${AppMenuKeys.managerList}`);

        cy.get('main .ant-btn-primary').first().click()

        const managerName = 'manager12345'
        const managerEmail = "manager12345@manager12345.com"
        const managerPassword = '12345'

        cy.get('input[placeholder="nickname"]').type(managerName)
        cy.get('input[type=email]').type(managerEmail)
        cy.get('input[type=password]').type(managerPassword)
        cy.get('form .ant-select-selector').click()
        cy.get('.ant-select-dropdown .ant-select-item-option-content').first().click()
        cy.get('button[type="submit"]').click()
        //End add Manager   

        // Log out
        cy.get('header .anticon-logout').click()
        // End log out
        cy.get('label:nth-of-type(3)').click()
        cy.get('input[type=email]').type(managerEmail)
        cy.get('input[type=password]').type(`${managerPassword}{enter}`)
        // Log on again

        // Verify 
        cy.url().then(() => {
            let permittedMenus = User.getPermittedMenus();
            // To get the menu items rendered we need to first click their parents
            cy.get('.ant-menu-submenu').click({ multiple: true }).then(() => {
                permittedMenus.forEach(element => {
                    cy.get(`a[href="${PermittedMenuMapToMenuKey[element]}"]`).should('exist')
                });
            });
        })
        // End verify

        // Delete to cleanup
        cy.get('header .anticon-logout').click()

        cy.get('label:nth-of-type(3)').click()
        cy.get('input[type=email]').type(email)
        cy.get('input[type=password]').type(`${password}{enter}`)

        cy.location('pathname', { timeout: 60000 }).should('include', '/home');

        cy.get('.ant-menu-submenu:nth-of-type(5)').click()
        cy.get(`a[href="${AppMenuKeys.managerList}"]`).click()

        cy.location('pathname', { timeout: 60000 }).should('include', `${AppMenuKeys.managerList}`);

        cy.get('main .ant-input').type(`${managerName}{enter}`)

        cy.get('.ant-space .ant-space-item:nth-of-type(2)').click()
        cy.get('.ant-popover-inner button:nth-of-type(2)').click()
        // End of cleanup
    })
})