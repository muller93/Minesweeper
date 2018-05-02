module.exports = draw;

function draw (array, diff) {
  for (let i = 0; i < diff; i++) {
    let row = '';
    for (let j = 0; j < diff; j++) {
      row += array[i][j] + ' ';
    }
    console.log(row);
  }
}
