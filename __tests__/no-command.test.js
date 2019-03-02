const nixt = require('..');

describe('nixt#run', () => {
  it('throws an error when no command is supplied', () => {
    expect(() => {
      nixt().end(() => {});
    }).toThrowErrorMatchingSnapshot();
  });
});
