const fs = require('fs');
const { join } = require('path');

const file = join(__dirname, 'tmp', 'writefile-test');

describe('nixt#writeFile', () => {
  it('creates a new file', (done) => {
    nfixt()
      .writeFile(file)
      .run('node writefile.js')
      .stdout('File exists')
      .after(() => {
        fs.unlinkSync(file);
      })
      .end(done);
  });
});
