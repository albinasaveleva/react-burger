import { createAction } from '@reduxjs/toolkit';
import { WS_ORDER_HISTORY_ENDPOINT, WS_URL } from '../../utils/burger-api';
import { getCookie } from '../../utils/cookies';
import { AppDispatch } from '../store/store';

export const wsConnect = createAction<string, 'ORDER_HISTORY_WS_CONNECT'>('ORDER_HISTORY_WS_CONNECT');
export const wsDisconnect = createAction('ORDER_HISTORY_WS_DISCONNECT');

export const wsConnecting = createAction('ORDER_HISTORY_WS_CONNECTING');

export const wsOpen = createAction('ORDER_HISTORY_WS_OPEN');
export const wsClose = createAction('ORDER_HISTORY_WS_CLOSE');
export const wsMessage = createAction<any, 'ORDER_HISTORY_WS_MESSAGE'>('ORDER_HISTORY_WS_MESSAGE');
export const wsError = createAction<string, 'ORDER_HISTORY_WS_ERROR'>('ORDER_HISTORY_WS_ERROR');

export type TWSOrderHistoryActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;


  export const wsOrderHistoryActions = {
    wsConnect,
    wsDisconnect,
  
    wsConnecting,
    
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
  };

  export function connectWSOrderHistory() {
    return function(dispatch: AppDispatch) {
      const wsUrl = `${WS_URL}/${WS_ORDER_HISTORY_ENDPOINT}?token=${getCookie('accessToken')}`
      dispatch(wsConnect(wsUrl));
    }
  }
  
  export function disconnectWSOrderHistory() {
    return function(dispatch: AppDispatch) {
      dispatch(wsDisconnect())
    }
  }