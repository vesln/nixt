var fs = require('fs');
var join = require('path').join;

var file1 = join(__dirname, 'tmp', 'file-1');
var file2 = join(__dirname, 'tmp', 'file-2');

describe('nixt filters', function() {
  it('runs the filters in the expected order', function(done) {
    var before = 0;
    var after = 0;

    nfixt()
    .before(function() {
      before++;
      fs.writeFileSync(file1, '');
    })
    .before(function(next) {
      before++;
      fs.writeFile(file2, '', next);
    })
    .after(function() {
      after++;
      fs.unlinkSync(file1);
      fs.unlinkSync(file2);
    })
    .run('node filters.js')
    .stdout('Files exist')
    .end(function() {
      before.should.eq(2);
      after.should.eq(1);

      fs.existsSync(file1).should.be.false;
      fs.existsSync(file2).should.be.false;

      done();
    });
  });
});
