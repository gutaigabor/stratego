import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";

export type UserState = {
  userId?: string;
  username?: string;
  token?: string;
};

const initialState : UserState = {
  userId: undefined,
  username: undefined,
  token: undefined,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { userId, username, token } }: PayloadAction<{ userId: string, username: string; token: string }>
    ) => {
      state.userId = userId;
      state.username = username;
      state.token = token;
    },
    setToken: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.token = payload;
    }
  },
  extraReducers: (builder) => {
    const tempState = {
      username: undefined,
      token: undefined
    };
    builder.addCase(PURGE, () => tempState);
  }
});

export const { setCredentials, setToken} = slice.actions;

export default slice.reducer;
