var fs = require('fs');
var join = require('path').join;
var file = join(__dirname, 'tmp', 'writefile-test');

describe('nixt#unlink', function() {
  it('removes a file', function(done) {
    nfixt()
    .writeFile(file)
    .run('node writefile.js')
    .stdout('File exists')
    .unlink(file)
    .after(function() {
      fs.existsSync(file).should.eq(false);
    })
    .end(done);
  });
});
