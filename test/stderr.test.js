describe('nixt#stderr', () => {
  it('can assert with strings', (done) => {
    nfixt()
      .run('node hello-err.js')
      .stderr('Hello')
      .end(done);
  });

  it('returns an error when stderr does not match the desired string', (done) => {
    nfixt()
      .run('node hello-err.js')
      .stderr('Fail')
      .end((err) => {
        err.message.should.eq('`node hello-err.js`: Expected stderr to match "Fail". Actual: "Hello"');
        done();
      });
  });

  it('can assert with regular expressions', (done) => {
    nfixt()
      .run('node hello-err.js')
      .stderr(/Hell/)
      .end(done);
  });

  it('returns an error when the regexp does not match the stderr', (done) => {
    nfixt()
      .run('node hello-err.js')
      .stderr(/Fail/)
      .end((err) => {
        err.message.should.eq('`node hello-err.js`: Expected stderr to match "/Fail/". Actual: "Hello"');
        done();
      });
  });
});
