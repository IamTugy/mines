import seedrandom from 'seedrandom';

import { getInitializedCell, getCellType, Empty } from '../features/board/boardSlice';

const executeActionOnNearCells = (location, height, width, board, action) => {
  const x = Math.floor(location / width);
  const y = location % width;
  for( let i = Math.max(0, x-1); i <= Math.min(height-1, x+1); i++) {
    for( let j = Math.max(0, y-1); j <= Math.min(width-1, y+1); j++) {
      action(board, i * width + j);
    }
  }
};



export const generateBoardUsingFisherYatesAlgorithm = ({ height, width, bombAmount, randomSeedKey }) => {
  const randomSeed = new seedrandom(randomSeedKey);
  const bombLocations = {};

  for( let i = 0; i < bombAmount; i++) {
    bombLocations[i] = true;
  }

  for( let i = 0; i < bombAmount; i++) {
    const location = Math.floor(randomSeed() * height * width)
    const temp = bombLocations[location];
    bombLocations[location] = bombLocations[i];
    bombLocations[i] = Boolean(temp);
  }

  const newBoard = {};
  const bombLocationsList = Object.values(Object.entries(bombLocations).filter(([_, value]) => value)).map(([location, _]) => location);
  for (const location of bombLocationsList) {
    const newCell = getInitializedCell()
    newCell.isBomb = true;
    newBoard[location] = newCell;
  }

  const addBombsToNearCellsCounter = (board, location) => {
    board[location] = board[location] || getInitializedCell();
    board[location].closeBombs += 1
  };

  bombLocationsList.forEach((location) => executeActionOnNearCells( location, height, width, newBoard, addBombsToNearCellsCounter))
  return newBoard;
}

export const exposeNearCells = (location, height, width, board) => {
  const exposeStack = [location];
  const exposeCell = (board, location) => {
    const cellData = board[location] || getInitializedCell();
    const currentCellType = getCellType(cellData, true);
    if (!cellData.isSelected && (currentCellType === Empty)) {
      exposeStack.push(location);
    }
    cellData.isSelected = !cellData.hasFlag;
    board[location] = cellData;
  }
  
  while (exposeStack.length > 0) {
    const location = exposeStack[0];
    const currCellData = board[location] || getInitializedCell();
    currCellData.isSelected = !currCellData.hasFlag;
    board[location] = currCellData;
    const cellType = getCellType(currCellData, true);
    if (cellType === Empty) {
      executeActionOnNearCells(location, height, width, board, exposeCell);
    }
    exposeStack.shift();
  }
};
