const { nfixt } = require('./utils');

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

  it('can respond to prompts with regexp groups', (done) => {
    nfixt()
      .run('node prompt.js')
      .on(/prompt: (.+): $/).respond(([first]) => `${first}\n`)
      .on(/(\w+): (\w+): $/)
      .respond(([group1, group2]) => `${group1}, ${group2}\n`)
      .stdout(/first: first/)
      .stdout(/prompt, second/)
      .code(0)
      .end(done);
  });
});
