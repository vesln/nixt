/**
 * Read interactive prompts on a stream and
 * write the associated response to another
 *
 * Largely borrowed from @jprichardson's module "node-suppose"
 * https://github.com/jprichardson/node-suppose/
 *
 * @param {Stream} Readable Stream to listen for prompts on.
 * @param {Stream} Writable Stream to write respones to.
 * @param {Array} An array of prompts {Regex|String}
 * @param {Array} An array of responses {String}
 * @api public
 */

exports.run = function (readable, writable, expects, responses) {
  let needNew = true; let buffer = ''; let
    match = false;
  let expect = ''; let
    response = '';

  readable.on('data', (data) => {
    buffer += data.toString();
    if (needNew) {
      expect = expects.shift();
      response = responses.shift();
      needNew = false;
    }

    if (typeof expect === 'string') {
      match = buffer.lastIndexOf(expect) === buffer.length - expect.length;
      writable.write(response);
    } else if (typeof expect === 'object') {
      const matches = buffer.match(expect);
      const text = (typeof response === 'function') ? response(matches.slice(1)) : response;
      writable.write(text);
      match = matches !== null;
    }

    if (match) {
      needNew = true;
      match = false;

      if (expects.length === 0 && responses.length === 0) {
        writable.end();
      }
    }
  });
};
