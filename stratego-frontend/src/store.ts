import { configureStore, isRejected, Middleware } from "@reduxjs/toolkit";
import {
  persistStore,
  Persistor,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import rootReducer from './reducers';
import api from './reducers/api';

const setMiddlewares = () => {
  const middlewares = [];
  middlewares.push(api.middleware);

  const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejected(action)) {
      console.warn(action);
    }
    return next(action);
  };
  middlewares.push(rtkQueryErrorLogger);

  return middlewares;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(setMiddlewares()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const persistor: Persistor = persistStore(store);
