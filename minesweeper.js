const readlineSync = require('readline-sync');
const top = require('fs');
const plox = require('./modules/pepe');
const draw = require('./modules/draw');
const minegen = require('./modules/minegen');
const blockTile = require('./blocktile');
const matgen = require('./modules/matgen');

let player = '';
var hitcount = 0;
var flagcount = 0;
var x = 0;
var y = 0;
var loop = true;
var tempX = 0;
var tempY = 0;
var minefield = '';
var minePlaces = '';
var mloop = true;
var interFace;
var flagPlaces = [];
var tempFlag = '';

function menu () {
  console.log('MINESWEEPER PROJECT');
  console.log('Welcome to Minesweeper!');
  interFace = blockTile.init();
  let menupoints = ['New Game', 'High score', 'Credits'];
  var menu = readlineSync.keyInSelect(menupoints, 'Please, select from the following menu points.');
  switch (menu) {
    case 0:
      levelsName();
      break;
    case 1:
      console.clear();
      var hofDiff = ['Easy', 'Medium', 'Hard'];
      var hof = readlineSync.keyInSelect(hofDiff, 'Which Hall Of Fame are you interested in?');
      switch (hof) {
        case 0:
          console.clear();
          hallOfFame('easy', 'easy', './topEasy.txt');
          readlineSync.keyIn('Press a key to return to the menu');
          break;
        case 1:
          console.clear();
          hallOfFame('medium', 'medium', './topMedium.txt');
          readlineSync.keyIn('Press a key to return to the menu');
          break;
        case 2:
          console.clear();
          hallOfFame('hard', 'hard', './topHard.txt');
          readlineSync.keyIn('Press a key to return to the menu');
          break;
      }
      break;
    case 2:
      console.clear();
      plox.drawPepe(plox.pepe);
      console.log('Special thanks to the following people:');
      console.log('Team members: Máté Tóth, Barna Rojik, Norbert Müller and Bálint László');
      console.log('Mentors: Ferenc "Feri" Fábián, István "Tyson" Nagy, Zsolt "Tasi" Tasnádi');
      readlineSync.keyIn('Press a key to return to the menu');
      break;
    default:
      console.log('Good bye! See you soon!');
      exit();
      break;
  }
}
function exit () {
  mloop = false;
}

function result (saveTo) {
  console.log('Congratulations ' + player + '! You won! Your score is: ' + hitcount);
  top.appendFileSync(saveTo, 'Number of hits: ' + hitcount + ' --- Players name: ' + player + ' --- Date: ' + date() + '\n', 'utf-8');
}

function hallOfFame (diff, diffName, readFrom) {
  diff = top.readFileSync(readFrom, 'utf-8');
  console.log('The Hall Of Fame for ' + diffName + ' level');
  console.log(diff);
}

function date () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function step (numLimit, alfLimit) {
  switch (alfLimit) {
    case 0:
      tempX = readlineSync.keyIn('Which column (character) do you choose? ', { limit: '$<a-j>' });
      break;
    case 1:
      tempX = readlineSync.keyIn('Which column (character) do you choose? ', { limit: '$<a-p>' });
      break;
    case 2:
      tempX = readlineSync.keyIn('Which column (character) do you choose? ', { limit: '$<a-v>' });
      break;
    default:
      break;
  }
  tempX = readlineSync.keyIn('Which column (character) do you choose? ', { limit: '$<a-z>' });
  let tempXU = tempX.toUpperCase();
  x = translate(tempXU);
  tempY = readlineSync.questionInt('Which row (number) do you choose? ');
  if (tempY > 0 && tempY < numLimit) {
    y = tempY - 1;
  } else {
    console.log('Wrong input! Try again.');
    return step(numLimit);
  }
}

function translate (alphabet) {
  let i = 0;
  let array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];
  while (i < array.length && array[i] !== alphabet) {
    i += 1;
  }
  if (i < array.length) {
    return (i);
  }
}
function change (ui, y, x, array) {
  ui[y + 1][x + 1] = array[y][x];
}

function xreveal (array) {
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array.length; x++) {
      if (array[y][x] === 'X') {
        change(interFace, y, x, array);
      }
    }
  }
  return interFace;
}

function flagging (y, x, interFace) {
  interFace[y + 1][x + 1] = 'F';
  flagPlaces.push('m' + y + x);
  return interFace;
}

function unflagging (y, x, interFace) {
  if (interFace[y + 1][x + 1] === 'F') {
    tempFlag = 'm' + y + x;
    if (flagPlaces.length === 1) {
      interFace[y + 1][x + 1] = '█';
      flagPlaces.pop();
      flagcount--;
    }
    let i = 0;
    while (i < flagPlaces.length && flagPlaces[i] !== tempFlag) {
      i++;
    }
    if (i < flagPlaces.length) {
      interFace[y + 1][x + 1] = '█';
      flagPlaces.splice(i + 1, 1);
      flagcount--;
      return interFace;
    } else {
      console.log('There is no flag there.');
      readlineSync.keyIn('Press a key to proceed.');
    }
  }
}

function levelsName () {
  console.clear();
  player = readlineSync.question('What is your name? ');
  loop = true;
  let difficultyLevels = ['Easy', 'Medium', 'Hard'];
  var difficultyLevel = readlineSync.keyInSelect(difficultyLevels, 'Please, select a difficulty level.');
  switch (difficultyLevel) {
    case 0:
      console.clear();
      minefield = minegen.minegen(8, 10);
      draw(interFace, 9);
      step(11, 0);
      do {
        flagcount = 0;
        minefield = matgen(8);
        minefield = minegen.minegen(8, 10);
      }
      while (minefield[y][x] !== 0);
      minePlaces = minegen.rM(10);
      fieldCheck(y, x, 8, 9);
      hitcount++;
      while (loop === true) {
        console.clear();
        draw(interFace, 9);
        console.log('Number of hits: ' + hitcount);
        console.log('Remaining flags:', 10 - flagcount);
        movement(8, 9, 10, 'topEasy.txt', 11);
      }

      break;
    case 1:
      console.clear();
      minefield = minegen.minegen(16, 40);
      draw(interFace, 17);
      step(17, 1);
      do {
        flagcount = 0;
        minefield = matgen(16);
        minefield = minegen.minegen(16, 40);
      }
      while (minefield[y][x] !== 0);
      minePlaces = minegen.rM(40);
      fieldCheck(y, x, 16, 17);
      hitcount++;
      while (loop === true) {
        console.clear();
        draw(interFace, 17);
        console.log('Number of hits: ' + hitcount);
        console.log('Remaining flags:', 40 - flagcount);
        movement(16, 17, 40, 'topMedium.txt', 17);
      }

      break;
    case 2:
      console.clear();
      minefield = minegen.minegen(22, 99);
      draw(interFace, 23);
      step(23, 2);
      do {
        flagcount = 0;
        minefield = matgen(22);
        minefield = minegen.minegen(22, 99);
      }
      while (minefield[y][x] !== 0);
      minePlaces = minegen.rM(99);
      fieldCheck(y, x, 22, 23);
      hitcount++;
      while (loop === true) {
        console.clear();
        draw(interFace, 23);
        console.log('Number of hits: ' + hitcount);
        console.log('Remaining flags:', 99 - flagcount);
        movement(22, 23, 99, 'topHard.txt', 23);
      }
      break;
  }
}

function movement (fcDiff, lSize, flagNum, diff, numLimit, alfLimit) {
  let options = ['Try a new hit', 'Put a flag down', 'Remove a flag', 'Check for all the bombs'];
  var option = readlineSync.keyInSelect(options, 'What is your next step?');
  switch (option) {
    case 0:
      step(numLimit);
      hitcount += 1;
      fieldCheck(y, x, fcDiff, lSize);
      break;

    case 1:
      step(numLimit);
      flagging(y, x, interFace);
      flagcount++;
      break;

    case 2:
      if (flagPlaces.length === 0) {
        console.log("You currently don't have any flags");
        readlineSync.keyIn('Press a key to proceed.');
      } else {
        step(numLimit);
        unflagging(y, x, interFace);
      }
      break;

    case 3:
      flagCheck(flagNum, diff);
      break;

    default:
      let exit = readlineSync.keyInYN('Do you want to exit?');
      if (exit === true) {
        loop = false;
      }
      break;
  }
}

function lose (size) {
  console.clear();
  draw(xreveal(minefield), size);
  console.log('You have blown up! Game over!');
  readlineSync.keyIn('Press a key to return to the menu');
  loop = false;
}

function fieldCheck (y, x, fcSize, lSize) {
  switch (minefield[y][x]) {
    case 'X':
      lose(lSize);
      break;
    case 0:
      minefield[y][x] = ' ';
      change(interFace, y, x, minefield);
      for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
          if (i >= 0 && i < fcSize && j >= 0 && j < fcSize && minefield[i][j] !== ' ') {
            fieldCheck(i, j, fcSize, lSize);
            change(interFace, i, j, minefield);
          }
        }
      }
      break;
    default:
      change(interFace, y, x, minefield);
      break;
  }
}

function flagCheck (mC, diff) {
  if (flagcount === mC) {
    let k = 0;
    let shared = [];
    for (let i = 0; i < flagPlaces.length; i++) {
      let j = 0;
      while (j < minePlaces.length && minePlaces[j] !== flagPlaces[i]) {
        j++;
      }
      if (j < minePlaces.length) {
        shared[k] = flagPlaces[i];
        k++;
      }
    }
    if (shared.length === mC) {
      result(diff);
      readlineSync.keyIn('Press a key to return to the menu');
      loop = false;
    } else {
      lose();
    }
  }
}

while (mloop === true) {
  mloop = true;
  console.clear();
  menu();
}
