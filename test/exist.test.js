var fs = require('fs');
var join = require('path').join;
var file = join(__dirname, 'tmp', 'exists-file-test');
var dir = join(__dirname, 'tmp', 'exists-dir-test');

describe('nixt#exist', function() {
  it('can verify that a file exists', function(done) {
    nfixt()
    .writeFile(file)
    .run('node void.js')
    .exist(file)
    .unlink(file)
    .end(done);
  });

  it('returns an error when the file does not exist', function(done) {
    nfixt()
    .run('node void.js')
    .exist(file)
    .end(function(err) {
      (err !== null).should.eq(true);
      done();
    });
  });

  it('can verify that a directory exists', function(done) {
    nfixt()
    .mkdir(dir)
    .run('node void.js')
    .exist(dir)
    .rmdir(dir)
    .end(done);
  });

  it('returns an error when the directory does not exist', function(done) {
    nfixt()
    .run('node void.js')
    .exist(dir)
    .end(function(err) {
      (err !== null).should.eq(true);
      done();
    });
  });
});
