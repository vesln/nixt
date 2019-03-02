const nixt = require('..');
const { join } = require('path');

describe('nixt', () => {
  it('can strip colors from stdout and stderr', (done) => {
    nixt({ colors: false })
      .cwd(join(__dirname, 'fixtures'))
      .run('node colors.js')
      .stdout('Stdout')
      .stderr('Stderr')
      .end(done);
  });
});
