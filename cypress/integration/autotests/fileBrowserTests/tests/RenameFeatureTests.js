context('Тестирование главной страницы', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/resources/', { fixture: 'resources.json' }).as('resources');
        cy.intercept('GET', '**/usage/', { fixture: 'usage.json' }).as('usage')
        cy.visit('/')
        cy.loginViaUi("manoshkin", "1")
        cy.wait('@resources')
        cy.wait('@usage')
        cy.wait('@login')
    })

    it('Тестирование редактирования файла', () => {
        cy.intercept('GET', '**/manoshkin', { fixture: 'emptymanoshkin.json' }).as('manoshkin')
        cy.intercept('PATCH', '**rename**').as('rename')
        cy.get('p[data-order]').click()
        cy.contains('mode_edit').click()
        cy.get('code').should('include.text', 'manoshkin')

        cy.get('.input').clear()
        cy.get('.input').type('agagag')
        cy.get('[type="submit"]').click()
        cy.wait('@rename').its('request.url').should('include', 'agagag')
    })
})