const fs = require('fs');
const { join } = require('path');

const file = join(__dirname, '..', 'tmp', process.argv[2]);

if (fs.existsSync(file)) {
  console.log('File exists');
}
