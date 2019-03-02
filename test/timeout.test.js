describe('nixt#timeout', function() {
  it('force quits comamnds that take longer than specified', function(done) {
    nfixt()
    .run('node timeout.js')
    .stdout(/output from spawned script/)
    .timeout(800)
    .end(function(err) {
      err.message.should.eq('`node timeout.js`: Command execution terminated (timeout)');
      done();
    });
  });
});
