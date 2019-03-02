describe('nixt#env', () => {
  it('sets environemt variables', (done) => {
    nfixt()
      .env('HELLO', 'true')
      .env('BYE', 'true')
      .run('node env.js')
      .code(0)
      .end(done);
  });
});
