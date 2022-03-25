import { stringifyQuery } from '@/utils/query';

describe('test utils query', function () {
  it('stringifyQuery function', function () {
    expect(stringifyQuery({
      name: 'jack',
      age: 18
    })).toBe('?name=jack&age=18');
    expect(stringifyQuery({})).toBe('');
  });
});
