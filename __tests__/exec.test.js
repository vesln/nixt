const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');

const file = join(__dirname, 'tmp', 'writefile-test5');

describe('nixt#exec', () => {
  it('runs the supplied command', (done) => {
    nfixt()
      .exec(`node ${join(__dirname, 'fixtures', 'create-file.js')} writefile-test5`)
      .run('node writefile.js writefile-test5')
      .stdout('File exists')
      .unlink(file)
      .end(done);
  });

  it('respects the current working directory', (done) => {
    const root = join(__dirname, 'tmp');
    const fixture = join(root, 'foo.tmp.js');

    nfixt()
      .cwd(root)
      .exec('touch foo.tmp.js')
      .run('')
      .end((err) => {
        // should.not.exist(err);
        expect(err).toBeUndefined();
        expect(fs.existsSync(fixture)).toBe(true);
        fs.unlinkSync(fixture);
        done();
      });
  });
});
