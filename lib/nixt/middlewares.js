var fs = require('fs');

exports.mkdir = function(path) {
  return function(next) {
    fs.mkdir(path, function(err) {
      if (err) throw err;
      next();
    });
  };
};
