const prompt = require('prompt');

prompt.colors = false;
prompt.start();

prompt.get(['first', 'second'], (err, result) => {
  console.log('Command-line input received:');
  console.log(`  first: ${result.first}`);
  console.log(`  second: ${result.second}`);
});
