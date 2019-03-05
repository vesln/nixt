const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');


describe('nixt#writeFile', () => {
  it('creates a new file', (done) => {
    const file = join(__dirname, 'tmp', 'writefile-test4');
    nfixt()
      .writeFile(file)
      .run('node writefile.js writefile-test4')
      .stdout('File exists')
      .after(() => {
        fs.unlinkSync(file);
      })
      .end(done);
  });
});
