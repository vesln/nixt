const { nfixt } = require('./utils');

describe('nixt#stdout', () => {
  it('can assert with strings', (done) => {
    nfixt()
      .run('node hello.js')
      .stdout('Hello')
      .end(done);
  });

  it('returns an error when stdout does not match the desired string', (done) => {
    nfixt()
      .run('node hello.js')
      .stdout('Fail')
      .end((err) => {
        expect(err.message).toBe('`node hello.js`: Expected stdout to match "Fail". Actual: "Hello"');
        done();
      });
  });

  it('can assert with regular expressions', (done) => {
    nfixt()
      .run('node hello.js')
      .stdout(/Hell/)
      .end(done);
  });

  it('returns an error when the regexp does not match the stdout', (done) => {
    nfixt()
      .run('node hello.js')
      .stdout(/Fail/)
      .end((err) => {
        expect(err.message).toBe('`node hello.js`: Expected stdout to match "/Fail/". Actual: "Hello"');
        done();
      });
  });
});
