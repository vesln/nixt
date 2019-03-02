describe('nixt#code', () => {
  it('can verify the exit code of a program', (done) => {
    nfixt()
      .run('node code-0.js')
      .code(0)
      .end(done);
  });

  it('returns an error when the exit code does not match the expected one', (done) => {
    nfixt()
      .run('node code-0.js')
      .code(1)
      .end((err) => {
        err.message.should.eq('`node code-0.js`: Expected exit code: "1", actual: "0"');
        done();
      });
  });

  it('returns an error when the nonzero exit code does not match the expected one', (done) => {
    nfixt()
      .run('node code-1.js')
      .code(0)
      .end((err) => {
        err.message.should.eq('`node code-1.js`: Expected exit code: "0", actual: "1"');
        done();
      });
  });
});
