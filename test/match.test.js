var join = require('path').join;
var file = join(__dirname, 'tmp', 'writefile-test');

describe('nixt#match', function() {
  it('can assert with strings', function(done) {
    nfixt()
    .writeFile(file, 'Hello')
    .run('node void.js')
    .match(file, 'Hello')
    .unlink(file)
    .end(done);
  });

  it('can assert with regular expressions', function(done) {
    nfixt()
    .writeFile(file, 'Hello')
    .run('node void.js')
    .match(file, /ello/)
    .unlink(file)
    .end(done);
  });

  it('returns an error when the contents does not match the desired string', function(done) {
    nfixt()
    .writeFile(file, 'Hello')
    .run('node void.js')
    .match(file, 'Bye')
    .unlink(file)
    .end(function(err) {
      (err !== true).should.eq(true);
      done();
    });
  });
});
