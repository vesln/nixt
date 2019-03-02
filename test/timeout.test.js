describe('nixt#timeout', () => {
  it('force quits comamnds that take longer than specified', (done) => {
    nfixt()
      .run('node timeout.js')
      .stdout(/output from spawned script/)
      .timeout(800)
      .end((err) => {
        err.message.should.eq('`node timeout.js`: Command execution terminated (timeout)');
        done();
      });
  });
});
