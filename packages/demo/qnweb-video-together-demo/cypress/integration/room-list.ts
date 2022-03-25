// @ts-ignore
import { getButton } from '@hon2a/cypress-antd';

describe('/room-list', function () {
  beforeEach(() => {
    cy.login();
    cy.visit('/room-list');
    cy.url().should('include', '/room-list');
  });
  /**
   * 检查页面内的元素
   */
  it('Checking page elements', function () {
    cy.get('table').should('exist');
    cy.get('table').find('th').should('have.length', 5);
    const ths = ['房间ID', '房间名', '创建者', '邀请码', '操作'];
    ths.forEach((th, index) => {
      cy.get('table').find('th').eq(index).should('contain', th);
    });
  });
  /**
   * 检查列表数据
   * 如果有数据，则进入最新的房间
   */
  it('Check if the list has data', function () {
    cy.get('table').get('tbody');
    cy.get('table').get('tbody').find('tr').then(elements => {
      cy.get('table').get('tbody').find('tr').should('have.length', elements.length);
      if (elements.length) {
        getButton('加入房间').click();
      }
    });
  });
});