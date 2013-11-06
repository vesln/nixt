describe('nixt#base', function() {
  it('sets a base command', function(done) {
    nfixt()
    .base('node ')
    .run('code-0.js')
    .code(0)
    .end(done);
  });
});
