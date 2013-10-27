var fs = require('fs');
var join = require('path').join;
var file = join(__dirname, '..', 'tmp', 'writefile-test');

if (fs.existsSync(file)) {
  console.log('File exists');
}
