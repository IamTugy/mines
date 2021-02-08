import { createSlice } from '@reduxjs/toolkit';
import { generateBoard, exposeNearCells } from '../../utils/boardUtils';

export const gameWon = 'WON';
export const gameLost = 'LOST';
export const gameOnConfigurations = 'onConfigurations';
export const gamePreRunning = 'preRunning';
export const gameRunning = 'running';

export const gameFinalStates = [gameWon, gameLost];

const getInitialState = (seed) => {
  return {
    /** The content of the board, two dimentional list of all the data **/
    cellsContent: null,
    boardHeight: null,
    boardWidth: null,
    totalFlagsAmount: 0,
    usedFlagsAmount: 0,
    gameState: gameOnConfigurations,
    isFlagMode: false,
    randomSeedKey: seed,
  }
};

export const getInitializedCell = () => {
  return {
    isBomb: false,
    hasFlag: false,
    closeBombs: 0,
    isSelected: false,
  }
};

export const Flag = "flag";
export const Bomb = "bomb";
export const Number = "number";
export const Empty = "empty";

export const getCellType = (cellData, isSupermanMode) => {
  if ( cellData.hasFlag ) {
    return Flag;
  }
  if ( cellData.isSelected || isSupermanMode ) {
    if ( cellData.isBomb ) {
      return Bomb;
    }
    if ( cellData.closeBombs > 0 ) {
      return Number;
    }
  }
  return Empty;
};

const toggleFlag = (state, action) => {
  const { x, y } = action.payload
  const cellContent = state.cellsContent[x][y];
  const isFlagAdded = !cellContent.hasFlag;

  /** if removing a flag or if there are flags left to put another **/
  if ( !isFlagAdded || state.usedFlagsAmount < state.totalFlagsAmount ) {

    if (cellContent.isBomb) {
      state.bombsDetected += isFlagAdded ? 1 : -1;
    }

    const isGameWon = state.bombsDetected === state.totalFlagsAmount;
    state.gameState = isGameWon ? gameWon : gameRunning;
    cellContent.hasFlag = isFlagAdded;
    state.usedFlagsAmount = state.usedFlagsAmount + (isFlagAdded ? 1 : -1);
  }
};

const displayCell = (state, action) => {
  const { x, y } = action.payload;
  const {isBomb, hasFlag, closeBombs} = state.cellsContent[x][y];

  if (hasFlag) return;

  if (isBomb) {
    state.cellsContent[x][y].isSelected = true;
    state.gameState = gameLost;
    return;
  }

  if (closeBombs > 0) {
    state.cellsContent[x][y].isSelected = true;
    return;
  }

  exposeNearCells({
    x, y, 
    height: state.boardHeight, 
    width: state.boardWidth,
    board: state.cellsContent
  });
};


const boardSlice = createSlice({
  name: 'board',
  devTools: false,
  initialState: getInitialState(Math.random()),
  reducers: {
    createBoard: (state, action) => {
      const { height, width, flagAmount } = action.payload;
      state.boardHeight = height;
      state.boardWidth = width;
      state.totalFlagsAmount = flagAmount;
      state.usedFlagsAmount = 0;
      state.bombsDetected = 0;
      state.cellsContent = generateBoard({ height, width, bombAmount: flagAmount, randomSeedKey: state.randomSeedKey});
      state.gameState = gameRunning;
    },

    setIsFlagMode: (state, action) => {
      state.isFlagMode = action.payload;
    },

    resetBoard: (state, action) => {
      return getInitialState(Math.random());
    },

    handleUserClick: (state, action) => {
      if (state.isFlagMode) {
        toggleFlag(state, action);
      } else {
        displayCell(state, action);
      }
    },

    setGameState: (state, action) => {
      state.gameState = action.payload;
    }
  }
})

export const {
  createBoard,
  resetBoard,
  setIsFlagMode,
  handleUserClick,
  setGameState
} = boardSlice.actions;

export default boardSlice.reducer;