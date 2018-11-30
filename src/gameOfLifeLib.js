const newGeneration = function(board){
  let newBoard = board.map((row,rowNo) =>
    row.map((stateOfElement,columnNo) => {
      let noOfAlives = findNeighboursState(rowNo,columnNo,board).reduce(sum,0);
      return nextStateOfCell(noOfAlives,stateOfElement);
    }));
  return newBoard;
}

const sum = function(a,b){
  return a+b;
}

const findAliveCellLocation = function(board){
  let coordinateList = [];
  for(outerindex = 0;outerindex<board.length;outerindex++){
    for(innerindex = 0;innerindex<board[outerindex].length;innerindex++){
      if(board[outerindex][innerindex]){
        coordinateList.push([outerindex,innerindex]);
      }
    }
  }
  return coordinateList;
}

const nextStateOfCell = function(totalAliveNeighbours,currentStateoOfCell){
  let result = [0,0,currentStateoOfCell,1,0,0,0,0,0]
  return result[totalAliveNeighbours];
}

const findBoardCells = function(board){
  let newBoard = board.slice(0);
  newBoard = newBoard.map((row,rowNo) => {
    return row.map((column,columnNo) => {
      return findNeighboursState(rowNo,columnNo,board)
    });
  });
  return newBoard;
}

const findNeighboursState = function(row,column,board){
  let mainrow = board[row]
  let leftrow = board[row-1] || [];
  let rightrow = board[row+1] || [];
  cells = [ mainrow[column-1],mainrow[column+1]]
  cells.push(leftrow[column])
  cells.push(leftrow[column+1],leftrow[column-1])
  cells.push(rightrow[column],rightrow[column+1],rightrow[column-1])
  cells = cells.filter((x) => x != undefined)
  return cells;
}

const getCoordinates = function(coordinate1,coordinate2){
  let list = [];
  for(let i = coordinate1[0] ; i <= coordinate2[0] ; i++){
    for(let j = coordinate1[1] ; j <= coordinate2[1] ; j++){
      list.push([i,j]);
    }
  }
  return list;
}

const placeAlives = function(list,board){
  let boardcoordinates = getCoordinates([0,0],[board.length-1,board[0].length-1])
  let newlist = list.filter((x) => findArray(x,boardcoordinates));
  newlist.map((x) => board[x[0]][x[1]] = 1)
  return board;
};

const findArray = function(array,list){
  return list.some((elem) => {
    let result1 = elem.every((x) => array.includes(x));
    let result2 = array.every((x) => elem.includes(x));
    return result1 && result2;
  });
}

const createArray = function(length,filler){
  return new Array(length).fill(filler);
}

const generateBoard = function(rows,columns){
  return createArray(rows,rows).map((x) => createArray(columns,0));
}

module.exports = { 
  generateBoard ,
  findArray ,
  placeAlives,
  findAliveCellLocation ,
  getCoordinates ,
  newGeneration
};