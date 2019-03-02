describe('nixt', () => {
  it('can respond to prompts ending in a literal string', (done) => {
    nfixt()
      .run('node prompt.js')
      .on('prompt: first: ').respond('first response\n')
      .on('prompt: second: ')
      .respond('second response\n')
      .stdout(/first: first response/)
      .stdout(/second: second response/)
      .code(0)
      .end(done);
  });

  it('can respond to prompts matching an expression', (done) => {
    nfixt()
      .run('node prompt.js')
      .on(/prompt: (.+): $/).respond('first response\n')
      .on(/prompt: (.+): $/)
      .respond('second response\n')
      .stdout(/first: first response/)
      .stdout(/second: second response/)
      .code(0)
      .end(done);
  });
});
