const matgen = require('./matgen');
const draw = require('./draw');

let easymat = matgen(8, 8);
let firstHit = [3, 4];

do {
  easymat = matgen(8, 8);
  easy();
}
while (easymat[3][4] !== 0);

if (easymat[3][4] === 0) {
  easymat[3][4] = ' ';
  for (let i = 3 - 1; i <= 3 + 1; i++) {
    for (let j = 4 - 1; j <= 4 + 1; j++) {
      if (easymat[i][j] !== ' ') {
        easymat[i][j] = 'S';
      }
    }
  }
}

function easy () {
  for (let i = 0; i < 10; i++) {
    let y = Math.floor((Math.random() * 8));
    let x = Math.floor((Math.random() * 8));
    if (easymat[y][x] !== 'X') {
      easymat[y][x] = 'X';
      switch (y) {
        case 0:
          for (let i = y; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
              if (easymat[i][j] !== 'X') {
                easymat[i][j] += 1;
              }
            }
          }
          break;
        case 7:
          for (let i = y - 1; i <= y; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
              if (easymat[i][j] !== 'X') {
                easymat[i][j] += 1;
              }
            }
          }
          break;
        default:
          for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
              if (easymat[i][j] !== 'X') {
                easymat[i][j] += 1;
              }
            }
          }
          break;
      }
    } else {
      i--;
    }
  }
  return easymat;
}

module.exports = easy;
draw(easymat, 8);
