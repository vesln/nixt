const fs = require('fs');
const { join } = require('path');

const file = join(__dirname, 'tmp', 'writefile-test');

describe('nixt#unlink', () => {
  it('removes a file', (done) => {
    nfixt()
      .writeFile(file)
      .run('node writefile.js')
      .stdout('File exists')
      .unlink(file)
      .after(() => {
        fs.existsSync(file).should.eq(false);
      })
      .end(done);
  });
});
