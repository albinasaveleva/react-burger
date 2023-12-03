import { createAction } from '@reduxjs/toolkit';
import { WS_ORDER_FEED_ENDPOINT, WS_URL } from '../../utils/burger-api';
import { AppDispatch } from '../store/store';

export const wsConnect = createAction<string, 'ORDER_FEED_WS_CONNECT'>('ORDER_FEED_WS_CONNECT');
export const wsDisconnect = createAction('ORDER_FEED_WS_DISCONNECT');

export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING');

export const wsOpen = createAction('ORDER_FEED_WS_OPEN');
export const wsClose = createAction('ORDER_FEED_WS_CLOSE');
export const wsMessage = createAction<any, 'ORDER_FEED_WS_MESSAGE'>('ORDER_FEED_WS_MESSAGE');
export const wsError = createAction<string, 'ORDER_FEED_WS_ERROR'>('ORDER_FEED_WS_ERROR');

export type TWSOrderFeedActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;

export const wsOrderFeedActions = {
  wsConnect,
  wsDisconnect,

  wsConnecting,
  
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
};

export function connectWSOrderFeed() {
  return function(dispatch: AppDispatch) {
    const wsUrl = `${WS_URL}/${WS_ORDER_FEED_ENDPOINT}`
    dispatch(wsConnect(wsUrl));
  }
}

export function disconnectWSOrderFeed() {
  return function(dispatch: AppDispatch) {
    dispatch(wsDisconnect())
  }
}