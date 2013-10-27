var fs = require('fs');
var join = require('path').join;
var dir = join(__dirname, 'tmp', 'mkdir-test');

describe('nixt#rmdir', function() {
  it('removes a directory', function(done) {
    nfixt()
    .mkdir(dir)
    .run('node mkdir.js')
    .stdout('Directory exists')
    .rmdir(dir)
    .after(function() {
      fs.existsSync(dir).should.eq(false);
    })
    .end(done);
  });
});
