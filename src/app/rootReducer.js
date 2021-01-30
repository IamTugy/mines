import { combineReducers } from '@reduxjs/toolkit';
import additionalDataReducer from '../features/additionalData/additionalInfoSlice';
import boardReducer from '../features/board/boardSlice';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  additionalData: persistReducer(persistConfig, additionalDataReducer),
  board: boardReducer
});

export default rootReducer;