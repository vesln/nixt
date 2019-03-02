const fs = require('fs');
const { join } = require('path');
const { nfixt } = require('./utils');

const file1 = join(__dirname, 'tmp', 'file-1');
const file2 = join(__dirname, 'tmp', 'file-2');

describe('nixt filters', () => {
  it('runs the filters in the expected order', (done) => {
    let before = 0;
    let after = 0;

    nfixt()
      .before(() => {
        before++;
        fs.writeFileSync(file1, '');
      })
      .before((next) => {
        before++;
        expect(fs.existsSync(file1)).toBe(true);
        fs.writeFile(file2, '', next);
      })
      .after(() => {
        after++;
        fs.unlinkSync(file1);
        fs.unlinkSync(file2);
      })
      .run('node filters.js')
      .stdout('Files exist')
      .end(() => {
        expect(before).toBe(2);
        expect(after).toBe(1);

        expect(fs.existsSync(file1)).toBe(false);
        expect(fs.existsSync(file2)).toBe(false);

        done();
      });
  });
});
