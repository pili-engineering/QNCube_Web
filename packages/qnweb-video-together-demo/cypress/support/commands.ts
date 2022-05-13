// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// import "cypress-localstorage-commands";

export const baseApiUrl = 'http://10.200.20.28:5080';

export interface UserAccount {
  readonly phone: string;
  readonly smsCode: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      randomAccount: typeof randomAccount,
      login: typeof login,
    }
  }
}

/**
 * 生成随机用户
 */
function randomAccount() {
  const accounts = [
    { phone: '10011', smsCode: '8888' }
  ];
  return cy.then(() => {
    return accounts[Math.floor(Math.random() * accounts.length)];
  });
}

/**
 * 登录
 */
function login() {
  cy.randomAccount().as('account').then(function (account: UserAccount) {
    cy
      .request({
        url: baseApiUrl + '/v1/signUpOrIn',
        method: 'POST',
        body: {
          phone: account.phone,
          smsCode: account.smsCode,
        },
      })
      .its('body.data.loginToken')
      .then(token => {
        window.localStorage.setItem('authorization', token);
      });
  });
}


Cypress.Commands.add('randomAccount', randomAccount);
Cypress.Commands.add('login', login);
