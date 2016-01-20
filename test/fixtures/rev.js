var data = '';

process.stdin.on('data', function (chunk) {
  var lines = (data + chunk).split('\n');
  data = lines.pop();
  lines.forEach(printReversed);
});

process.stdin.on('end', function () {
  if (data) {
    printReversed(data);
  }
});

function printReversed (line) {
  console.log(line.split('').reverse().join(''));
}
