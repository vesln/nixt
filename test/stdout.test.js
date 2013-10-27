var nixt = require('..');

describe('nixt#stdout', function() {
  it('can assert with strings', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello.js')
    .stdout('Hello')
    .end(done);
  });

  it('returns an error when stdout does not match the desired string', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello.js')
    .stdout('Fail')
    .end(function(err) {
      err.message.should.eq('[Stdout] `node hello.js`: Expected "Fail" to match "Hello"');
      done();
    });
  });

  it('can assert with regular expressions', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello.js')
    .stdout(/Hell/)
    .end(done);
  });

  it('returns an error when the regexp does not match the stdout', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello.js')
    .stdout(/Fail/)
    .end(function(err) {
      err.message.should.eq('[Stdout] `node hello.js`: Expected "/Fail/" to match "Hello"');
      done();
    });
  });
});
