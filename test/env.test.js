describe('nixt#env', function() {
  it('sets environemt variables', function(done) {
    nfixt()
    .env('HELLO', 'true')
    .env('BYE', 'true')
    .run('node env.js')
    .code(0)
    .end(done);
  });
});
