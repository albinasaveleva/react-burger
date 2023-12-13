import { WebsocketStatus } from '../../types/data';
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "./actions";
import { createReducer } from '@reduxjs/toolkit';


type TWSState = {
  status: WebsocketStatus;
  orders: [];
  total: number;
  totalToday: number;
  error: string;
}

const initialState: TWSState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  error: ''
};

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.orders = [];      
      state.total = 0;
      state.totalToday = 0;
      state.error = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
})