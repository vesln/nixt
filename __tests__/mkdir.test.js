const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');

const dir = join(__dirname, 'tmp', 'mkdir-test');

describe('nixt#mkdir', () => {
  it('creates a new directory', (done) => {
    nfixt()
      .mkdir(dir)
      .run('node mkdir.js mkdir-test')
      .stdout('Directory exists')
      .after(() => {
        fs.rmdirSync(dir);
      })
      .end(done);
  });
});
