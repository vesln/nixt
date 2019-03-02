const path = require('path');
const nixt = require('../..');

const nfixt = () => nixt().cwd(path.join(__dirname, '..', 'fixtures'));

module.exports = {
  nfixt,
};
