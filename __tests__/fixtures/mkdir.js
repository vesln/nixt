const fs = require('fs');
const { join } = require('path');

const dir = join(__dirname, '..', 'tmp', process.argv[2]);

if (fs.existsSync(dir)) {
  console.log('Directory exists');
}
