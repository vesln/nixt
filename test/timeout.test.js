describe('nixt#timeout', function() {
  it('force quits comamnds that take longer than specified', function(done) {
    nfixt()
    .run('node timeout.js')
    .timeout(100)
    .end(function(err) {
      err.message.should.eq('[Time] `node timeout.js`: Command execution terminated (timeout)');
      done();
    });
  });
});
