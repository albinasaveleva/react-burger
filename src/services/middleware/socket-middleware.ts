import type { Middleware } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';
import { refreshToken } from '../../utils/burger-api';

export type TWSActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,

  wsConnecting: ActionCreatorWithoutPayload,

  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware<{}, RootState> => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => (action) => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, wsConnecting, onOpen, onClose, onError, onMessage } = wsActions;
 
      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnecting());
          dispatch(onOpen());
          isConnected = true;
        };

        socket.onerror = event => {
          dispatch(onError(event.type));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(()=>{
              dispatch(wsConnect(url))
            }, 3000)
          }
        };

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;

          socket.close();
          dispatch(onClose());
        }

      }

      next(action);
    };
    });
};