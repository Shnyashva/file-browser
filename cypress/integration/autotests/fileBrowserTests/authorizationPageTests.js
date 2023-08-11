context('Тестирование страницы авторизации', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Тест на проверку текста заголовка', () => {
        cy.get('h1').should('have.text', 'File Browser')
    })

    it('Тест на проверку присутствия логотипа на странице', () => {
        cy.get('img').should('have.attr', 'alt', 'File Browser')
    })

    it('Тестировние аттрибутов кнопки входа', () => {
        cy.get('.button').should('have.attr', 'value', 'Войти')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
    })
    
    it('Тестирование подсказывающего теста полей ввода логина и пароля', () => {
        cy.get('[type="text"]').should('have.attr', 'placeholder', 'Имя пользователя')
        cy.get('[type="password"]').should('have.attr', 'placeholder', 'Пароль')
    })

    it('Тестирование авторизации', () => {
        cy.loginViaUi("admin", "admin")
    })
})