var fs = require('fs');
var join = require('path').join;
var dir = join(__dirname, 'tmp', 'mkdir-test')

describe('nixt#mkdir', function() {
  it('can assert with strings', function(done) {
    nfixt()
    .mkdir(dir)
    .run('node mkdir.js')
    .stdout('Directory exists')
    .after(function() {
      fs.rmdirSync(dir);
    })
    .end(done);
  });
});
