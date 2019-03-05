let data = '';

process.stdin.on('data', (chunk) => {
  const lines = (data + chunk).split('\n');
  data = lines.pop();
  lines.forEach(printReversed);
});

process.stdin.on('end', () => {
  if (data) {
    printReversed(data);
  }
});

function printReversed(line) {
  console.log(line.split('').reverse().join(''));
}
