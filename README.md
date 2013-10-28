[![Build Status](https://secure.travis-ci.org/vesln/nixt.png)](http://travis-ci.org/vesln/nixt)
[![Coverage Status](https://coveralls.io/repos/vesln/nixt/badge.png?branch=master)](https://coveralls.io/r/vesln/nixt?branch=master)

# Nixt

## Synopsis

Simple and powerful end-to-end testing for command-line apps.

## Description

Nixt is aiming to make testing of command-line apps as simple as possible. It
plays nice with the testing tools that you are already using and in case you are
one of those guys who practice outside-in BDD, it has the potential to become
something that lives in every command-line app that you are going to build.

### Simple

### Complex

### Formatting options

### Commands & Order

### Templates

### Custom expectations

### Custom middlewares

### Plugins

### Usage with a test runner

### Usage without a test runner

## API

### #before

Register a "before" middleware.

```js
nixt()
.before(fn)
.before(fn2)
.run(cmd)
.end();
```

### #after

Register an "after" middleware.

```js
nixt()
.run(cmd)
.after(fn)
.after(fn2)
.end();
```

### #cwd

Change the current working directory of the main command (specified with `run`).
Please not that this won't affect any other commands like `unlink` etc.

```js
nixt()
.cwd(path.join(__dirname, 'node_modules', '.bin')
.run('mocha --version')
.stdout('1.13.0')
.end();
```

### #run

Set a primary command to execute:

```js
nixt()
.run('node --version')
.stdout('0.10.16')
.end(fn);
```

You could also run the test right after specifying the command to run:

```js
nixt()
.stdout('0.10.16')
.run('node --version', fn)
```

### #timeout

Set a timeout for the main command that you are about to test.

```js
nixt()
.timeout(1) // ms
.run('cat /dev/null')
.end(fn);
```

### #stdout

Set expectations on stdout.

```js
nixt()
.stdout('LICENSE Makefile')
.run('ls')
.end(fn);
```

Works with regular expressions too.

```js
nixt()
.stdout(/system/)
.run('time')
.end(fn);
```

### #stderr

Same as `stdout` but well.. surprise works with stderr.

```js
nixt()
.run('todo add')
.stderr('Please speicfy a todo')
.end(fn);
```

### #code

Expect a given exit code.

```js
nixt()
.run('todo add')
.code(1)
.end(fn);
```

### #exist

Check if a given path exists (works with both files and directories).

```js
nixt()
.run('mkdir /tmp/test')
.exist('/tmp/test')
.end(fn);
```

### #match

Check the contents of a file.

```js
nfixt()
.writeFile(file, 'Hello')
.run('node void.js')
.match(file, 'Hello')
.unlink(file)
.end(done);
```

```js
nfixt()
.writeFile(file, 'Hello')
.run('node void.js')
.match(file, /ello/)
.unlink(file)
.end(done);
```

### #mkdir

Create a new directory.

```js
nixt()
.mkdir('xml-database')
.run('this does stuff with the xml-database directory')
.end(fn);
```

### #exec

Execute a given command.

```js
nixt()
.touch('LICENSE')
.exec('git add -a')
.exec('git commit -m "Add LICENSE"')
.run('git log')
.stdout(/LICENSE/)
.end();
```

### #writeFile

Create a file with or without given contents.

Without:

```js
nixt()
.writeFile(pathToFile)
.end();
```

With:

```js
nixt()
.writeFile(pathToFile, data)
.end();
```

### #rmdir

Remove a directory.

```js
nixt()
.mkdir('xml-database')
.run('this does stuff with the xml-database directory')
.rmdir('xml-database')
.end(fn);
```

### #unlink

Unlink a file.

```js
nixt()
.touch('my-file')
.run('this does stuff with my file')
.unlink('my-file')
.end(fn);
```

### #end

Run the given test.

```js
nixt()
.run('ls')
.stdout('this-is-not-porn-i-promise')
.end(function(err) {

});
```

The same might be accomplished with supplying a function to `run`:

```js
nixt()
.stdout('this-is-not-porn-i-promise')
.run('ls', function(err) {

})
```

### #clone

Deep clone a Nixt instance.

```js
var clone = nixt()
.before(fn)
.after(fn)
.run('my awesome command')
.end()
.clone();
```

### #expect

Register a custom expectation.

```js
nixt()
.expect(function(result) {
  if (result.stdout !== 'Unicorns') {
    return new Error('OMG');
  }
})
.run('ls')
.end(fn);
```

## Installation

```bash
$ npm install nixt
```

## Tests

### Running the tests

```bash
$ npm install
$ make test
```

### Test coverage

```bash
$ make test-cov
```

### JSlint

```bash
$ make jshint
```

## Contributors

## Credits

Special thanks to:

  - [Martin Lazarov](https://github.com/mlazarov)

## Support the author

Do you like this project? Star the repository, spread the word - it really helps. You may want to follow
me on [Twitter](https://twitter.com/vesln) and
[GitHub](https://github.com/vesln). Thanks!

## License

**MIT License**

Copyright (C) 2013 Veselin Todorov (hi@vesln.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
