// The Game Board
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

// Game variable declarations
let players = ['X', 'O']
let currentPlayer;
let available = [];

// Sets up the canvas, chooses which "side" goes first, and fills up the "available" table
function setup() {
  createCanvas(400, 400);
  frameRate(1);
  currentPlayer = floor(random(players.length));

  // Available table is used for tracking whether a move can be made (a.k.a. move only when available)
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i,j]);
    }
  }
}

// Updates the board with the move, and changes turn to another player.
function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

// A helper function for conditional branches.
function equals3(a, b, c) {
  return (a==b && a==c && b==c && a != '');
}

// A simple function to check whether there is a winner throughout the game.
function checkWinner() {
  let winner = null;

  // Check vertical
  for (let i = 0; i < 3; i++) {
    if ( equals3(board[i][0], board[i][1], board[i][2]) ) {
      winner = board[i][0];
    }
  }
  // Check horizontal
  for (let i = 0; i < 3; i++) {
    if ( equals3(board[0][i], board[1][i], board[2][i]) ) {
      winner = board[0][i];
    }
  }
  // Check Diaognal
  if ( equals3(board[0][0], board[1][1], board[2][2]) ) {
    winner = board[0][0];
  } else if ( equals3(board[2][0], board[1][1], board[0][2]) ) {
    winner = board[2][0];
  } else if (winner == null && available.length == 0) {
    return tie;
  } else {
    return winner;
  }

}


// This is where the game is drawn, and everything happens.
function draw() {
  // Declarations
  background(220);
  let w = width / 3;
  let h = height / 3;

  // Drawing the lines
  line(w, 0, w, height); // Vertical
  line(w * 2, 0, w * 2, height); // Vertical
  line(0, h, width, h); // Horizontal
  line(0, h * 2, width, h * 2); // Horizontal

  // Drawing the entire table for the "X" and "O" by constantly looking up array spot
  // and draw based on the player that had chosen the coordinates.
  // Note: For those who are wondering why I used 'j' first instead of 'i', there were some mistakes made where switching the letters in the loops solved my problem.
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      // Coordinate creation
      let x = w * i + w/2; // w/2 is used for adjustment when drawing so it's centered
      let y = h * j + h/2; // h/2 is used for adjustment when drawing so it's centered
      let spot = board[i][j];

      textSize(32);
      strokeWeight(4);
      
      if (spot == players[1]) {
        // If spot has players[1], draw a "O" in that spot
        noFill();
        ellipse(x,y,w/2);
      } else if (spot == players[0]) {
        // If spot has players[0], draw an "X" in that spot
        let xr = w/4; // Just used for adjustment when drawing the players.
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }

      text(spot, x, y);
    }
  }

  // Deciding whether there is a winner.
  let result = checkWinner();
  if (result != null) {
    noLoop();
    createP(result).style('color', '#FFF').style('font-size', '50px');
  } else {
    nextTurn();
  }

  // Once game is done, restart the website to run again.
}
