/**
 * Created by vijaybudhram on 8/26/16.
 */

const board = require('./board.json');

const diceWeight = {
  "0": 0.00,
  "2": 0.03,
  "3": 0.06,
  "4": 0.08,
  "5": 0.11,
  "6": 0.14,
  "7": 0.17,
  "8": 0.14,
  "9": 0.11,
  "10": 0.08,
  "11": 0.06,
  "12": 0.03
};

const POINT_COUNT = 53
var tilesKeys = Object.keys(board.tiles);

var points = [];

for (var i = 0; i <= POINT_COUNT; i++) {

  // Get all adjacent tiles
  var adjTiles = [];
  tilesKeys.forEach(function (tileKey) {
    var tile = board.tiles[tileKey];
    if (tile["adj"].indexOf(i) > -1) {
      adjTiles.push(tile);
    }
  });

  // Sum probability
  var probabilitySum = 0;
  adjTiles.forEach(function (tile) {
    probabilitySum = probabilitySum + diceWeight[tile.roll];
  })

  points.push({
    adjTiles: adjTiles,
    probabilitySum: probabilitySum,
    pointNumber: i
  })
}

// Sort by probability and print
points = points.sort(function (a, b) {
  return b.probabilitySum - a.probabilitySum;
})

points.forEach(function (point) {
  console.log("Point[" + point.pointNumber + "].probabilitySum = " + point.probabilitySum.toFixed(2));
});



