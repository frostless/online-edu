describe('The Login Page', () => {
    // beforeEach(() => {
    //   // seed a user in the DB that we can control from our tests
    //   // assuming it generates a random password for us
    //     cy.request('POST', 'api/manager/add', {
    //         "role_id": 5,
    //         "email": "manager12345@manager.com",
    //         "nickname": "test12345",
    //         "password": "12345"
    //     })
    //         .its('body')
    //         .as('currentUser')
    // })

    it('should log in with info set in local storage', function () {
        // Destructuring assignment of the this.currentUser object
        // const { email, password } = this.currentUser
        const email = 'green@green.com'
        const password = '123456'

        cy.visit('/login')

        cy.get('input[type=email]').type(email)

        // {enter} causes the form to submit
        cy.get('input[type=password]').type(`${password}{enter}`)

        // We should be redirected to /index
        cy.url().should('include', '/index', () => {
            // Token should be present
            expect(localStorage.getItem("token")).to.exist()
            expect(localStorage.getItem("loginType")).to.exist()
        })
    })
})