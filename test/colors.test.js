var nixt = require('..');
var join = require('path').join;

describe('nixt', function() {
  it('can strip colors from stdout and stderr', function(done) {
    nixt({ colors: false })
    .cwd(join(__dirname, 'fixtures'))
    .run('node colors.js')
    .stdout('Stdout')
    .stderr('Stderr')
    .end(done);
  });
});
