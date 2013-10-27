describe('nixt#code', function() {
  it('can verify the exit code of a program', function(done) {
    nfixt()
    .run('node code-0.js')
    .code(0)
    .end(done);
  });

  it('returns na error when the exit code does not match the expected one', function(done) {
    nfixt()
    .run('node code-0.js')
    .code(1)
    .end(function(err) {
      err.message.should.eq('[Code] `node code-0.js`: Expected exit code: "1", actual: "0"');
      done();
    });
  });
});
