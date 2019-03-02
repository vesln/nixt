const fs = require('fs');
const { join } = require('path');

const dir = join(__dirname, '..', 'tmp', 'mkdir-test');

if (fs.existsSync(dir)) {
  console.log('Directory exists');
}
