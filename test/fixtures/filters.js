var fs = require('fs');
var join = require('path').join;

var file1 = join(__dirname, '..', 'tmp', 'file-1');
var file2 = join(__dirname, '..', 'tmp', 'file-2');

if (fs.existsSync(file1) && fs.existsSync(file2)) {
  console.log('Files exist');
} else {
  console.log('Files do not exist');
}
