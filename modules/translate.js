module.exports = translate;

function translate (alphabet) {
  let i = 0;
  let array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];
  while (i < array.length && array[i] !== alphabet) {
    i += 1;
  }
  if (i < array.length) {
    return (i + 1);
  }
}
