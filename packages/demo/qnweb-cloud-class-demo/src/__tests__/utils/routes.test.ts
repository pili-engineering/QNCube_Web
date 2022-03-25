import { generateRoutePath } from '@/utils/routes';

describe('test utils route', function () {
  it('generateRoutePath function', function () {
    expect(
      generateRoutePath('/login')
    ).toBe('/login');
    expect(
      generateRoutePath('/list', {
        query: { page: 1, pageSize: 10 }
      })
    ).toBe('/list?page=1&pageSize=10');
    expect(
      generateRoutePath('/user/:id/interest/list', {
        params: { id: '520' }
      })
    ).toBe('/user/520/interest/list');
    expect(
      generateRoutePath('/user/:id/interest/list', {
        query: { page: 1, pageSize: 10 },
        params: { id: '520' }
      })
    ).toBe('/user/520/interest/list?page=1&pageSize=10');
  });
});
