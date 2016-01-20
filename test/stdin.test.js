describe('nixt#stdin', function() {
  it('no effect if stdin is not used', function(done) {
    nfixt()
    .run('node hello.js')
    .stdout('Hello')
    .end(done);
  });

  it('passes given string on stdin', function(done) {
    nfixt()
    .stdin('foo\nbar')
    .run('node rev.js')
    .stdout('oof\nrab')
    .end(done);
  });

  it('does end the input stream', function(done) {
    nfixt()
    .stdin('')
    .run('node rev.js')
    .stdout('')
    .end(done);
  });
});
