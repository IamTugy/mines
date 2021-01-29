import { getInitializedCell, getCellType, Empty, Bomb } from '../features/board/boardSlice';

const randomeBomb = ({bombAmount, cellsAmount}) => {
  return (Math.random() < (bombAmount / cellsAmount))
}

const addBombToRelatives = ( x, y, height, width, board ) => {
  for( let i = x-1; i <= x+1; i++) {
    for( let j = y-1; j <= y+1; j++) {
      if ((i >= 0) && (i < height)) {
        if ((j >= 0) && (j < width)) {
          board[i][j].closeBombs += 1;
        }
      }
    }
  }
}

const addCloseBombs = ( height, width, board ) => {
  for( let i = 0; i < height; i++) {
    for( let j = 0; j < width; j++) {
      if (board[i][j].isBomb) {
        addBombToRelatives(i, j, height, width, board);
      }
    }
  }
}

export const generateBoard = ({ height, width, bombAmount }) => {
  /** Generate a board with only bombs **/
  let bombsPlaced = 0;
  let passedCells = 0; 
  let newBoard = new Array(height);
  for( let i = 0; i < height; i++) {
    newBoard[i] = new Array(width);
    for( let j = 0; j < width; j++) {
      newBoard[i][j] = getInitializedCell()
      const isBomb = randomeBomb({
        bombAmount: bombAmount - bombsPlaced,
        cellsAmount: height * width - passedCells
      })
      newBoard[i][j].isBomb = isBomb;
      bombsPlaced += isBomb ? 1 : 0;
      passedCells += 1;
    }
  }

  /** Add closeBombs number **/
  addCloseBombs(height, width, newBoard);

  return newBoard;
}

export const exposeNearCells = ({ x, y, height, width, board }) => {
  const exposeStack = [[x, y]];
  const isGameLost = board[x][y].isBomb;
  while (exposeStack.length > 0) {
    const [currX, currY] = exposeStack[0];
    const currCellData = board[currX][currY];
    currCellData.isSelected = !currCellData.hasFlag;
    const cellType = getCellType({...currCellData, isSupermanMode: true});
    if (cellType === Empty) {
      for( let i = currX-1; i <= currX+1; i++) {
        for( let j = currY-1; j <= currY+1; j++) {
          if ((i >= 0) && (i < height)) {
            if ((j >= 0) && (j < width)) {
              const cellData = board[i][j];
              const currentCellType = getCellType({...cellData, isSupermanMode: true});
              if (!cellData.isSelected && (currentCellType === Empty)  ) {
                  exposeStack.push([i, j]);
                }
                cellData.isSelected = !cellData.hasFlag;
              }
            }
          }
        }
      }
    exposeStack.shift()
  }
  return isGameLost;
}