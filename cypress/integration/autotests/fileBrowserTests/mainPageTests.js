context('Тестирование главной страницы', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.loginViaUi("admin", "admin")
    })

    function renameFolder() {
        cy.get('.input').clear()
        cy.get('.input').type('folder')
        cy.get('[type="submit"]').click()
    }

    it('Тестирование переименования папки', () => {
        const daysAmount = new Date().getDate() - 2
        cy.get("p[data-order='-1']").click()
        cy.contains('info').click()
        cy.get('.break-word').should('contain', '2')
        cy.contains('Last Modified').parent().should('include.text', daysAmount + " days ago")
        cy.get('.button').click()

        cy.reload()
        cy.get("p[data-order='-1']").click()
        cy.get('[aria-label="Rename"]').children('[class="material-icons"]').click()
        renameFolder()

        cy.reload()
        cy.get("p[data-order='-1']").click()
        cy.contains('info').click()
        cy.get('.break-word').should('contain', 'folder')
    })
})