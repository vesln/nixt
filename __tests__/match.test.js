const { join } = require('path');
const { nfixt } = require('./utils');

describe('nixt#match', () => {
  it('can assert with strings', (done) => {
    const file = join(__dirname, 'tmp', 'writefile-test1');

    nfixt()
      .writeFile(file, 'Hello')
      .run('node void.js')
      .match(file, 'Hello')
      .unlink(file)
      .end(done);
  });

  it('can assert with regular expressions', (done) => {
    const file = join(__dirname, 'tmp', 'writefile-test2');
    nfixt()
      .writeFile(file, 'Hello')
      .run('node void.js')
      .match(file, /ello/)
      .unlink(file)
      .end(done);
  });

  it('returns an error when the contents does not match the desired string', (done) => {
    const file = join(__dirname, 'tmp', 'writefile-test3');
    nfixt()
      .writeFile(file, 'Hello')
      .run('node void.js')
      .match(file, 'Bye')
      .unlink(file)
      .end((err) => {
        expect(err).not.toBeNull();
        done();
      });
  });
});
