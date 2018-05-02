const matgen = require('./matgen');
var minePlacesTemp = [];
function minegen (matrixLength, mineNum) {
  let minefield = [];
  minefield = matgen(matrixLength);
  for (let i = 0; i < mineNum; i++) {
    let y = Math.floor((Math.random() * matrixLength));
    let x = Math.floor((Math.random() * matrixLength));
    if (minefield[y][x] !== 'X') {
      minefield[y][x] = 'X';
      for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
          if (i >= 0 && i < matrixLength && j >= 0 && j < matrixLength && minefield[i][j] !== 'X') {
            minefield[i][j] += 1;
          }
        }
      }
      minePlacesTemp.push('m' + y + x);
    } else {
      i--;
    }
  }
  return minefield;
}

function realMines (mineNum) {
  let i = minePlacesTemp.length - 1;
  let j = 0;
  let minePlaces = [];
  for (i; i >= minePlacesTemp.length - mineNum; i--) {
    minePlaces[j] = minePlacesTemp[i];
    j += 1;
  }
  return minePlaces;
}
module.exports = {minegen: minegen, rM: realMines};
