context('Тестирование главной страницы', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/resources/', {fixture: 'resources.json'}).as('resources');
        cy.intercept('GET', '**/usage/', {fixture: 'usage.json'}).as('usage')
        cy.visit('/')
        cy.loginViaUi("manoshkin", "1")
        cy.wait('@resources')
        cy.wait('@usage')
        cy.wait('@login')
    })

    it('Тестирование создания ссылки на 1 час без пароля', () => {
        cy.intercept('GET', '**/manoshkin', {fixture: 'emptymanoshkin.json'}).as('manoshkin')
        cy.intercept('POST', '**/manoshkin?expires**').as('share')

        cy.get('p[data-order]').click()
        cy.contains('share').click()

        cy.wait('@manoshkin')
        cy.get('.input-group > input').type('1')
        cy.get('.button--blue').click()

        cy.wait('@share')
        cy.get('div[class=card-content]').children().should('include.text', 'через час')

        cy.get(':nth-child(4) > .action > .material-icons').click()
    })

    it('Тестирование создания ссылки на 1 час с паролем', () => {
        cy.intercept('GET', '**/manoshkin', {fixture: 'emptymanoshkin.json'}).as('manoshkin')
        cy.intercept('POST', '**/manoshkin?expires**').as('share')

        cy.get('p[data-order]').click()
        cy.contains('share').click()

        cy.wait('@manoshkin')
        cy.get('.input-group > input').type('1')
        cy.get('.input--block').type('1')
        cy.get('.button--blue').click()

        cy.wait('@share')
        cy.get('div[class=card-content]').children().should('include.text', 'через час')

        cy.get(':nth-child(4) > .action > .material-icons').click()
    })
})