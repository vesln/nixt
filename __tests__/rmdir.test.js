const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');

const dir = join(__dirname, 'tmp', 'mkdir-test2');

describe('nixt#rmdir', () => {
  it('removes a directory', (done) => {
    nfixt()
      .mkdir(dir)
      .run('node mkdir.js mkdir-test2')
      .stdout('Directory exists')
      .rmdir(dir)
      .after(() => {
        expect(fs.existsSync(dir)).toBe(false);
      })
      .end(done);
  });
});
