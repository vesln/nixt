const nixt = require('..');

describe('nixt#run', () => {
  it('throws an error when no command is supplied', () => {
    should.throw(() => {
      nixt().end(() => {});
    }, 'Please provide a command to run. Hint: `nixt#run`');
  });
});
