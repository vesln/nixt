var fs = require('fs');
var join = require('path').join;
var file = join(__dirname, 'tmp', 'not-exists-file-test');
var dir = join(__dirname, 'tmp', 'not-exists-dir-test');

describe('nixt#notExist', function() {
  it('can verify that a file does not exist', function(done) {
    nfixt()
    .run('node void.js')
    .notExist(file)
    .end(done);
  });

  it('returns an error when the file does exist', function(done) {
    nfixt()
    .run('node void.js')
    .writeFile(file)
    .notExist(file)
    .unlink(file)
    .end(function(err) {
      (err !== null).should.eq(true);
      done();
    });
  });

  it('can verify that a directory exists', function(done) {
    nfixt()
    .run('node void.js')
    .notExist(dir)
    .end(done);
  });

  it('returns an error when the directory does exist', function(done) {
    nfixt()
    .run('node void.js')
    .mkdir(dir)
    .notExist(dir)
    .rmdir(dir)
    .end(function(err) {
      (err !== null).should.eq(true);
      done();
    });
  });
});
