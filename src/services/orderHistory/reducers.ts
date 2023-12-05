import { WebsocketStatus } from '../../types/data';
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions";
import { createReducer } from '@reduxjs/toolkit';

type TWSState = {
  status: WebsocketStatus;
  orders: [];
  error: string;
}

const initialState: TWSState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: ''
};

export const orderHistoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.error = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders
    })
})