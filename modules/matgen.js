module.exports = matgen;

function matgen (matrixLength) {
  let matrix = [[]];
  for (let j = 0; j < matrixLength; j++) {
    matrix[j] = [];
    for (let i = 0; i < matrixLength; i++) {
      matrix[j][i] = 0;
    }
  }
  return matrix;
}
