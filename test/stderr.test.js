var nixt = require('..');

describe('nixt#stderr', function() {
  it('can assert with strings', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello-err.js')
    .stderr('Hello')
    .end(done);
  });

  it('returns an error when stderr does not match the desired string', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello-err.js')
    .stderr('Fail')
    .end(function(err) {
      err.message.should.eq('[Stderr] `node hello-err.js`: Expected "Fail" to match "Hello"');
      done();
    });
  });

  it('can assert with regular expressions', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello-err.js')
    .stderr(/Hell/)
    .end(done);
  });

  it('returns an error when the regexp does not match the stderr', function(done) {
    nixt()
    .cwd(FIXTURES)
    .run('node hello-err.js')
    .stderr(/Fail/)
    .end(function(err) {
      err.message.should.eq('[Stderr] `node hello-err.js`: Expected "/Fail/" to match "Hello"');
      done();
    });
  });
});
