// @ts-ignore
import { getMessage, getButton } from '@hon2a/cypress-antd';

describe('/login', function () {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.randomAccount().as('account');
  });
  /**
   * 检查页面表单元素
   */
  it('Checking form elements', function () {
    cy.get('input[placeholder=请输入手机号]').should('exist');
    cy.get('input[placeholder=请输入验证码]').should('exist');
    cy.get('.agreement-text').children().eq(0).should('have.text', '我已阅读并同意');
    getButton('登 录').should('exist');
  });
  /**
   * 未输入手机号
   */
  it('Check that no mobile phone number is entered', function () {
    getButton('登 录').click();
    getMessage().should('have.text', '请输入手机号');
  });
  /**
   * 未输入验证码
   */
  it('Check that no verification code is entered', function () {
    cy.get('input[placeholder=请输入手机号]').type(this.account.phone);
    getButton('登 录').click();
    getMessage().should('have.text', '请输入验证码');
  });
  /**
   * 未阅读相关协议
   */
  it('Check that the protocol has not been read', function () {
    cy.get('input[placeholder=请输入手机号]').type(this.account.phone);
    cy.get('input[placeholder=请输入验证码]').type(this.account.smsCode);
    getButton('登 录').click();
    getMessage().should('contain.text', '请阅读并同意');
  });
  /**
   * 正常登录
   */
  it('Normal login', function () {
    cy.get('input[placeholder=请输入手机号]').type(this.account.phone);
    cy.get('input[placeholder=请输入验证码]').type(this.account.smsCode);
    cy.get('.agreement-text').children().eq(0).click();
    getButton('登 录').click();
  });
});