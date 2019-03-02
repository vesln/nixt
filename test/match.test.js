const { join } = require('path');

const file = join(__dirname, 'tmp', 'writefile-test');

describe('nixt#match', () => {
  it('can assert with strings', (done) => {
    nfixt()
      .writeFile(file, 'Hello')
      .run('node void.js')
      .match(file, 'Hello')
      .unlink(file)
      .end(done);
  });

  it('can assert with regular expressions', (done) => {
    nfixt()
      .writeFile(file, 'Hello')
      .run('node void.js')
      .match(file, /ello/)
      .unlink(file)
      .end(done);
  });

  it('returns an error when the contents does not match the desired string', (done) => {
    nfixt()
      .writeFile(file, 'Hello')
      .run('node void.js')
      .match(file, 'Bye')
      .unlink(file)
      .end((err) => {
        (err !== true).should.eq(true);
        done();
      });
  });
});
