const fs = require('fs');
const { join } = require('path');

const dir = join(__dirname, 'tmp', 'mkdir-test');

describe('nixt#rmdir', () => {
  it('removes a directory', (done) => {
    nfixt()
      .mkdir(dir)
      .run('node mkdir.js')
      .stdout('Directory exists')
      .rmdir(dir)
      .after(() => {
        fs.existsSync(dir).should.eq(false);
      })
      .end(done);
  });
});
