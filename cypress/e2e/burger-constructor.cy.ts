describe('template spec', () => {
  before(()=>{
    const email = 'cy_test@test.test';
    const password = 'test12345';

    cy.visit('/profile');
    cy.get('[data-testid=email_input]').type(`${email}{enter}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);
    cy.intercept('POST', 'login', { fixture: 'login.json' });
    cy.intercept('GET', 'user', { fixture: 'user.json' });
    cy.visit('/');
  
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });

  after(()=>{
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it('burger constructor', () => {
    cy.get('[data-testid=bun]').click();
    cy.get('#modal-close-btn').click();
    cy.get('[data-testid=tabs] > .tab:last').click();
    cy.get('[data-testid=ingredient]').click();
    cy.get('#modal-close-btn').click();
    cy.get('[data-testid=bun]').trigger("dragstart");
    cy.get('#burger-constructor').trigger("drop");
    cy.get('[data-testid=ingredient]').trigger("dragstart");
    cy.get('#burger-constructor').trigger("drop");
    cy.get('#order-button').click();
    cy.intercept('POST', 'orders', { fixture: 'order.json' });
    cy.get('#modal-close-btn').click();
  })
})