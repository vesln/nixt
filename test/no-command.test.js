var nixt = require('..');

describe('nixt#run', function() {
  it('throws an error when no command is supplied', function() {
    should.throw(function() {
      nixt().end(function() {});
    }, 'Please provide a command to run. Hint: `nixt#run`');
  });
});
