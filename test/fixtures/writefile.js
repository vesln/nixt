const fs = require('fs');
const { join } = require('path');

const file = join(__dirname, '..', 'tmp', 'writefile-test');

if (fs.existsSync(file)) {
  console.log('File exists');
}
