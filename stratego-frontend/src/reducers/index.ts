import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import api from './api';
import user from './user';
import websocket from './websocket';
import game from './game';

export const config = {
  key: 'root',
  storage,
  whitelist: ['user'],
  timeout: 10000
};

const rootReducer = persistCombineReducers(config, {
  [api.reducerPath]: api.reducer,
  user,
  websocket,
  game
});

export default rootReducer;