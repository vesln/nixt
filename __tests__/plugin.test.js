const nixt = require('..');

describe('nixt.register', () => {
  it('can register a single function', () => {
    const fn = () => 'registered';
    nixt.register('foo', fn);
    expect(nixt().foo()).toBe('registered');
  });

  it('can register multiple functions at once', () => {
    const fn = () => 'first';
    const fn2 = () => 'second';

    nixt.register({ baz: fn, bar: fn2 });
    expect(nixt().baz()).toBe('first');
    expect(nixt().bar()).toBe('second');
  });
});
