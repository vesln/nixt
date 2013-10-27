var fs = require('fs');
var join = require('path').join;
var dir = join(__dirname, '..', 'tmp', 'mkdir-test');

if (fs.existsSync(dir)) {
  console.log('Directory exists');
}
