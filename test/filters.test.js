const fs = require('fs');
const { join } = require('path');

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
        fs.existsSync(file1).should.eq(true);
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
        before.should.eq(2);
        after.should.eq(1);

        fs.existsSync(file1).should.eq(false);
        fs.existsSync(file2).should.eq(false);

        done();
      });
  });
});
