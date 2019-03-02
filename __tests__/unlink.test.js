const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');

const file = join(__dirname, 'tmp', 'writefile-test6');

describe('nixt#unlink', () => {
  it('removes a file', (done) => {
    nfixt()
      .writeFile(file)
      .run('node writefile.js writefile-test6')
      .stdout('File exists')
      .unlink(file)
      .after(() => {
        expect(fs.existsSync(file)).toBe(false);
      })
      .end(done);
  });
});
