import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import lodash from 'lodash';

import { calculateDiffToNow } from '../../utils/TimeUtils';

export const dafaultPlayerName = 'Unknown Player';

const initialState = {
  /** Previus games best score **/
  bestScores: {},
  gameBeginningTime: null,
  isSupermanMode: false,
  gameMode: null,
  playerName: dafaultPlayerName,
};

const additionalDataSlice = createSlice({
  name: 'additionalData',
  initialState,
  reducers: {
    startGame(state, action) {
      const { gameMode } = action.payload
      state.isSupermanMode = false;
      state.gameMode = gameMode;
      state.gameBeginningTime = moment().toISOString();
    },

    endGame(state, action) {
      const { isGameWon } = action.payload
      if (isGameWon) {
        const defaultValue = {}
        defaultValue[state.gameMode] = [];
        const bestScores = lodash.defaults(state.bestScores, defaultValue)
        bestScores[state.gameMode].push({ playerName: state.playerName, time: calculateDiffToNow(moment(state.gameBeginningTime)) })
        /** save best 10: **/
        bestScores[state.gameMode] = lodash.sortBy(bestScores[state.gameMode], (obj) => obj.time).slice(0, 25);
        state.bestScores = bestScores;
      }
    },

    setSupermanMode(state, action) {
      const { isSupermanMode } = action.payload
      state.isSupermanMode = isSupermanMode;
    },

    changePlayerName(state, action) {
      const playerName = action.payload;
      state.playerName = [null, ""].includes(playerName) ? dafaultPlayerName : playerName;
    }
  }
})

export const {
  startGame,
  endGame,
  setSupermanMode,
  changePlayerName
} = additionalDataSlice.actions;

export default additionalDataSlice.reducer;