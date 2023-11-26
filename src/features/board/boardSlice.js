import { createSlice } from '@reduxjs/toolkit';
import {exposeNearCells, generateBoardUsingFisherYatesAlgorithm} from '../../utils/boardUtils'

export const gameWon = 'WON';
export const gameLost = 'LOST';
export const gameOnConfigurations = 'onConfigurations';
export const gamePreRunning = 'preRunning';
export const gameRunning = 'running';

export const gameFinalStates = [gameWon, gameLost];

const getInitialState = (seed) => {
  return {
    /** The content of the board, two dimentional list of all the data **/
    cellsContent: {},  // key: cell index (0 to boardHeight*boardWidth), value: cell data
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

const getCellData = (state, location) => {
  state.cellsContent[location] = state.cellsContent[location] || getInitializedCell();
  return state.cellsContent[location];
};

const toggleFlag = (state, action) => {
  const { x, y } = action.payload;
  const location = state.boardWidth * x + y;
  const currentCellContent = getCellData(state, location);
  const isFlagAdded = !currentCellContent.hasFlag;

  /** if removing a flag or if there are flags left to put another **/
  if ( !isFlagAdded || state.usedFlagsAmount < state.totalFlagsAmount ) {

    if (currentCellContent.isBomb) {
      state.bombsDetected += isFlagAdded ? 1 : -1;
    }

    const isGameWon = state.bombsDetected === state.totalFlagsAmount;
    state.gameState = isGameWon ? gameWon : gameRunning;
    currentCellContent.hasFlag = isFlagAdded;
    state.usedFlagsAmount = state.usedFlagsAmount + (isFlagAdded ? 1 : -1);
  }
};

const displayCell = (state, action) => {
  const { x, y } = action.payload;
  const location = state.boardWidth * x + y;
  const currentCellContent = getCellData(state, location);
  const {isBomb, hasFlag, closeBombs} = currentCellContent;

  if (hasFlag) return;

  if (isBomb) {
    currentCellContent.isSelected = true;
    state.gameState = gameLost;
    return;
  }

  if (closeBombs > 0) {
    currentCellContent.isSelected = true;
    return;
  }

  exposeNearCells(location, state.boardHeight, state.boardWidth, state.cellsContent);
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
      state.cellsContent = generateBoardUsingFisherYatesAlgorithm({ height, width, bombAmount: flagAmount, randomSeedKey: state.randomSeedKey});
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
