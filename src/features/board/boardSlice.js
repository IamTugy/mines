import { createSlice } from '@reduxjs/toolkit'
import { generateBoard, exposeNearCells } from '../../utils/boardUtils'

export const gameWon = 'win';
export const gameLost = 'lose';

export const gameFinalStates = [gameWon, gameLost];

const initialState = {
  /** The content of the board, two dimentional list of all the data **/
  cellsContent: null,
  boardHeight: null,
  boardWidth: null,
  totalFlagsAmount: 0,
  usedFlagsAmount: 0,
  gameState: null,
}

export const getInitializedCell = () => {
  return {
    isBomb: false,
    hasFlag: false,
    closeBombs: 0,
    isSelected: false,
  }
}

export const Flag = "flag";
export const Bomb = "bomb";
export const Number = "number";
export const Empty = "empty";

export const getCellType = ({ isBomb, hasFlag, closeBombs, isSelected, isSupermanMode }) => {
  return hasFlag ? Flag : ((isSelected || isSupermanMode) ? (isBomb ? Bomb : ((closeBombs > 0) ? Number : Empty)) : Empty);
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard(state, action) {
      const { height, width, flagAmount } = action.payload
      return {
        ...state, 
        boardHeight: height,
        boardWidth: width,
        totalFlagsAmount: flagAmount,
        usedFlagsAmount: 0,
        cellsContent: generateBoard({ height, width, bombAmount: flagAmount})
      }
    },

    resetBoard(state, action) {
      return initialState;
    },

    toggleFlag(state, action) {
      const { x, y } = action.payload
      const hasFlag = !state.cellsContent[x][y].hasFlag;
      if ( !hasFlag || state.usedFlagsAmount < state.totalFlagsAmount ) {
        const boardCopy = JSON.parse(JSON.stringify(state.cellsContent));
        boardCopy[x][y].hasFlag = hasFlag;
        return { 
          ...state, 
          usedFlagsAmount: state.usedFlagsAmount + (hasFlag ? 1 : -1), 
          cellsContent: boardCopy
        };
      }
      return state;
    },

    resetFlags(state, action) {
      /** Remove all flags from the board**/

      return { ...state, usedFlagsAmount: 0 }
    },

    displayCell(state, action) {
      const { x, y } = action.payload;
      const { boardCopy, isGameLost } = exposeNearCells({
        x, y, 
        height: state.boardHeight, 
        width: state.boardWidth,
        board: state.cellsContent
      });
      return { 
        ...state,
        cellsContent: boardCopy,
        gameState: isGameLost ? gameLost : null 
      };
    }
  }
})

export const {
  createBoard,
  resetBoard,
  toggleFlag,
  resetFlags,
  displayCell
} = boardSlice.actions

export default boardSlice.reducer