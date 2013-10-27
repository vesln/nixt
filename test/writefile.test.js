var fs = require('fs');
var join = require('path').join;
var file = join(__dirname, 'tmp', 'writefile-test')

describe('nixt#writeFile', function() {
  it('creates a new file', function(done) {
    nfixt()
    .writeFile(file)
    .run('node writefile.js')
    .stdout('File exists')
    .after(function() {
      fs.unlinkSync(file);
    })
    .end(done);
  });
});
