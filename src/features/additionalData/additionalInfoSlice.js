import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { calculateDiffToNow } from '../../utils/TimeUtils'

const initialState = {
  /** Previus games best score **/
  bestScores: [],
  gameBeginningTime: null,
  isSupermanMode: false,
}

const additionalInfoSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startGame(state, action) {
      state.gameBeginningTime = moment().toISOString();
    },

    endGame(state, action) {
      const { isGameWon } = action.payload
      if (isGameWon) {
        state.bestScores = [...state.bestScores, calculateDiffToNow(moment(state.gameBeginningTime))];
      }
    },

    setSupermanMode(state, action) {
      const { isSupermanMode } = action.payload
      state.isSupermanMode = isSupermanMode;
    },
  }
})

export const {
  startGame,
  endGame,
  setSupermanMode,
} = additionalInfoSlice.actions

export default additionalInfoSlice.reducer