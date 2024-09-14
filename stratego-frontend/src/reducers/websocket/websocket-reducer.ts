import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum WebsocketStatusType {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTED = 'CONNECTED'
} 

type WebsocketState = {
  status: WebsocketStatusType;
};

const initialState : WebsocketState = {
  status: WebsocketStatusType.DISCONNECTED,
};

const slice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setStatus: (
      state,
      { payload: status }: PayloadAction<WebsocketStatusType>
    ) => {
      state.status = status;
    },
  }
});


export const { setStatus} = slice.actions;

export default slice.reducer;
