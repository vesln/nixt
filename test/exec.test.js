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

  it('respects the current working directory', function(done) {
    var root = join(__dirname, 'tmp');
    var fixture = join(root, 'foo.tmp.js');

    nfixt()
    .cwd(root)
    .exec('touch foo.tmp.js')
    .run('')
    .end(function(err) {
      should.not.exist(err);
      fs.existsSync(fixture).should.be.true;
      fs.unlinkSync(fixture);
      done();
    })
  });
});
