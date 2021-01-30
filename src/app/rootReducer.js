import { combineReducers } from '@reduxjs/toolkit';
import additionalDataReducer from '../features/additionalData/additionalInfoSlice';
import boardReducer from '../features/board/boardSlice';

export const rootReducer = combineReducers({
  additionalData: additionalDataReducer,
  board: boardReducer
});

export default rootReducer;