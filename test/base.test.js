describe('nixt#base', () => {
  it('sets a base command', (done) => {
    nfixt()
      .base('node ')
      .run('code-0.js')
      .code(0)
      .end(done);
  });
});
