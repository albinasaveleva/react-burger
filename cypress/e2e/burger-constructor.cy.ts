describe('template spec', () => {
  const email = 'cy_test@test.test';
  const password = 'test12345';
  const refreshToken = 'test-refreshToken';
  const accessToken = 'test-accessToken';

  const emailInput = '[data-testid=email_input]';
  const passwordInput = '[data-testid=password_input]';
  const bun = '[data-testid=bun]';
  const ingredient = '[data-testid=ingredient]';
  const closeBtn = '#modal-close-btn';
  const orderBtn = '#order-button';
  const tab = '[data-testid=tabs] > .tab:last';
  const constructor = '#burger-constructor';
  before(()=>{
    cy.visit('/profile');
    cy.get(emailInput).type(`${email}{enter}`);
    cy.get(passwordInput).type(`${password}{enter}`);
    cy.intercept('POST', 'login', { fixture: 'login.json' });
    cy.intercept('GET', 'user', { fixture: 'user.json' });
    cy.visit('/');
  
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify(refreshToken)
    );
    cy.setCookie('accessToken', accessToken)
  });

  after(()=>{
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it('burger constructor', () => {
    cy.get(bun).click();
    cy.get(closeBtn).click();
    cy.get(tab).click();
    cy.get(ingredient).click();
    cy.get(closeBtn).click();
    cy.get(bun).trigger("dragstart");
    cy.get(constructor).trigger("drop");
    cy.get(ingredient).trigger("dragstart");
    cy.get(constructor).trigger("drop");
    cy.get(orderBtn).click();
    cy.intercept('POST', 'orders', { fixture: 'order.json' });
    cy.get(closeBtn).click();
  })
})