var fs = require('fs');
var join = require('path').join;
var file = join(__dirname, 'tmp', 'writefile-test');

describe('nixt#exec', function() {
  it('runs the supplied command', function(done) {
    nfixt()
    .exec('node ' + join(__dirname, 'fixtures', 'create-file.js'))
    .run('node writefile.js')
    .stdout('File exists')
    .unlink(file)
    .end(done);
  });
});
