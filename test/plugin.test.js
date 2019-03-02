const nixt = require('..');
const should = require('chai').should();

describe('nixt.register', () => {
  it('can register a single function', () => {
    const fn = function () {};
    nixt.register('foo', fn);
    nixt.should.respondTo('foo');
  });

  it('can register multiple functions at once', () => {
    const fn = function () {};
    const fn1 = function () {};

    nixt.register({ baz: fn, bar: fn1 });

    nixt.should.respondTo('baz');
    nixt.should.respondTo('bar');
  });
});
