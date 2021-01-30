import { getInitializedCell, getCellType, Empty } from '../features/board/boardSlice';

const randomeBomb = ({bombAmount, cellsAmount}) => {
  return (Math.random() < (bombAmount / cellsAmount));
};

const excecuteActionOnNearCells = (x, y, height, width, board, action) => {
  for( let i = Math.max(0, x-1); i <= Math.min(height-1, x+1); i++) {
    for( let j = Math.max(0, y-1); j <= Math.min(width-1, y+1); j++) {
      action(i, j, board);
    }
  }
};

const addCloseBombs = ( height, width, board ) => {
  /** Add the amount of boms closed to the cell in all the board **/
  const action = (i, j, board) => board[i][j].closeBombs += 1;
  for( let x = 0; x < height; x++) {
    for( let y = 0; y < width; y++) {
      if (board[x][y].isBomb) {
        /** add bomb counter to relatives **/
        excecuteActionOnNearCells(x, y, height, width, board, action);
      }
    }
  }
};

export const generateBoard = ({ height, width, bombAmount }) => {
  /** Generate a board with only bombs **/
  let bombsPlaced = 0;
  let passedCells = 0; 
  let newBoard = new Array(height);
  for( let i = 0; i < height; i++) {
    newBoard[i] = new Array(width);
    for( let j = 0; j < width; j++) {
      newBoard[i][j] = getInitializedCell();
      const isBomb = randomeBomb({
        bombAmount: bombAmount - bombsPlaced,
        cellsAmount: height * width - passedCells
      });
      newBoard[i][j].isBomb = isBomb;
      bombsPlaced += isBomb ? 1 : 0;
      passedCells += 1;
    }
  }

  /** Add closeBombs number **/
  addCloseBombs(height, width, newBoard);

  return newBoard;
};

export const exposeNearCells = ({ x, y, height, width, board }) => {
  const exposeStack = [[x, y]];

  const action = (i, j, board) => {
    const cellData = board[i][j];
    const currentCellType = getCellType(cellData, true);
    if (!cellData.isSelected && (currentCellType === Empty)) {
        exposeStack.push([i, j]);
      }
      cellData.isSelected = !cellData.hasFlag;
  }
  
  while (exposeStack.length > 0) {
    const [currX, currY] = exposeStack[0];
    const currCellData = board[currX][currY];
    currCellData.isSelected = !currCellData.hasFlag;
    const cellType = getCellType(currCellData, true);
    if (cellType === Empty) {
      excecuteActionOnNearCells(currX, currY, height, width, board, action);
      }
    exposeStack.shift();
  }
};