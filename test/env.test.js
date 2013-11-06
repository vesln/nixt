describe('nixt#env', function() {
  it('sets environemt variables', function(done) {
    nfixt()
    .env('hello', 'true')
    .env('bye', 'true')
    .run('node env.js')
    .code(0)
    .end(done);
  });
});
