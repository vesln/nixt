const { nfixt } = require('./utils');

describe('nixt#stdin', () => {
  it('no effect if stdin is not used', (done) => {
    nfixt()
      .run('node hello.js')
      .stdout('Hello')
      .end(done);
  });

  it('passes given string on stdin', (done) => {
    nfixt()
      .stdin('foo\nbar')
      .run('node rev.js')
      .stdout('oof\nrab')
      .end(done);
  });

  it('does end the input stream', (done) => {
    nfixt()
      .stdin('')
      .run('node rev.js')
      .stdout('')
      .end(done);
  });
});
