const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');

const file = join(__dirname, 'tmp', 'exists-file-test');
const dir = join(__dirname, 'tmp', 'exists-dir-test');

describe('nixt#exist', () => {
  it('can verify that a file exists', (done) => {
    nfixt()
      .writeFile(file)
      .run('node void.js')
      .exist(file)
      .unlink(file)
      .end(done);
  });

  it('returns an error when the file does not exist', (done) => {
    nfixt()
      .run('node void.js')
      .exist(file)
      .end((err) => {
        // (err !== null).should.eq(true);
        expect(err).not.toBeNull();
        done();
      });
  });

  it('can verify that a directory exists', (done) => {
    nfixt()
      .mkdir(dir)
      .run('node void.js')
      .exist(dir)
      .rmdir(dir)
      .end(done);
  });

  it('returns an error when the directory does not exist', (done) => {
    nfixt()
      .run('node void.js')
      .exist(dir)
      .end((err) => {
        expect(err).not.toBeNull();
        done();
      });
  });
});
