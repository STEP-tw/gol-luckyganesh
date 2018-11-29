const { generateBoard , findArray ,newGeneration, placeAlives, findAliveCellLocation ,getCoordinates } = require("./gameOfLifeTemplate.js");

const nextGeneration = function(currentGeneration,bounds){
  let { topLeft , bottomRight } = bounds;
  let rows = bottomRight[0] - topLeft[0] +1;
  let columns = bottomRight[1] - topLeft[1] +1;
  let board = generateBoard(rows,columns);
  let coordinates = getCoordinates(topLeft,bottomRight);
  let newList = currentGeneration.filter((x) => findArray(x,coordinates));
  newList = newList.map((x) => [(x[0] - topLeft[0]),(x[1] - topLeft[1])]);
  placeAlives(newList,board);
  let result =findAliveCellLocation(newGeneration(board)).map((x) => {
    return [(x[0] +topLeft[0]),(x[1] + topLeft[1])]
  }); 
  return result; 
}

module.exports = { nextGeneration };
