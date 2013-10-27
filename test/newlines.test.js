var nixt = require('..');
var join = require('path').join;

describe('nixt', function() {
  it('can strip new lines from stdout and stderr', function(done) {
    nixt({ newlines: false })
    .cwd(join(__dirname, 'fixtures'))
    .run('node newlines.js')
    .stdout('Hello from newlines.js')
    .stderr('Error from newlines.js')
    .end(done);
  });
});
