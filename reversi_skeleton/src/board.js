// DON'T TOUCH THIS CODE
if (typeof window === "undefined") {
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid() {
  let grid = Array.from(Array(8), () => new Array(8));

  let b1 = new Piece("black");
  let b2 = new Piece("black");
  let w1 = new Piece("white");
  let w2 = new Piece("white");

  grid[3][3] = w1;
  grid[3][4] = b1;
  grid[4][3] = b2;
  grid[4][4] = w2;

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board() {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];
  return !(x < 0 || y < 0 || x > 7 || y > 7);
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    let strError = "Not valid pos!";
    throw new Error(strError);
  }
  let x = pos[0];
  let y = pos[1];
  return this.grid[x][y];
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos) === undefined) {
    return false;
  }
  return this.getPiece(pos).color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.getPiece(pos) !== undefined;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (pos, color, dir, piecesToFlip) {
  if (!this.isValidPos(pos)) return [];
  let x = pos[0];
  let y = pos[1];
  let dx = dir[0];
  let dy = dir[1];

  let newPos = [x + dx, y + dy];
  if (!this.isOccupied(newPos)) return [];

  if (!piecesToFlip) {
    piecesToFlip = [];
  }
  if (this.getPiece(newPos).color === color) return piecesToFlip;
  piecesToFlip.push(newPos);
  return this._positionsToFlip(newPos, color, dir, piecesToFlip);
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  // debugger
  let isUnoccupied = (this.getPiece(pos) === undefined) ;
  let dirs = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1] ];

  let isFlippable = dirs.some(dir => this._positionsToFlip(pos,color,dir).length >0);
  // debugger
  return isUnoccupied && isFlippable;

};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.isValidPos(pos) || !this.validMove(pos, color)) {
    throw new Error("Invalid move!");
  }

  let x  = pos[0];
  let y = pos[1];
  this.grid[x][y] = new Piece(color);
  this._positionsToFlip(pos, color, )
  let dirs = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

  let array = [];
  array.concat(  dirs.forEach(dir => this._positionsToFlip(pos, color, dir) ) );

  is


};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {};

// DON'T TOUCH THIS CODE
if (typeof window === "undefined") {
  module.exports = Board;
}
// DON'T TOUCH THIS CODE
