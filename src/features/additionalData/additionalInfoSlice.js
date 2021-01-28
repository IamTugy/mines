import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { calculateDiffToNow } from '../../utils/TimeUtils'

const initialState = {
  /** Previus games best score **/
  bestScores: [],
  gameBeginningTime: null,
  isSupermanMode: false,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame(state, action) {
      return { ...state, gameBeginningTime: moment()}
    },

    endGame(state, action) {
      const { isGameWon } = action.payload
      if (isGameWon) {
        return { 
          ...state, 
          bestScores: state.bestScores.push(calculateDiffToNow(state.gameBeginningTime))
        }
      }
    },

    setSupermanMode(state, action) {
      const { isSupermanMode } = action.payload
      return { ...state, isSupermanMode }
    },
  }
})

export const {
  startGame,
  endGame,
  setSupermanMode,
} = boardSlice.actions

export default boardSlice.reducer