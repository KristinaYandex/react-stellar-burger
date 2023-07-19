import { createAction } from "@reduxjs/toolkit";

export const connect = createAction('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction('FEED_WS_GET_MESSAGE');
export const wsError = createAction('FEED_WS_ERROR');


/*export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_FEED_MESSAGE = 'WS_GET_FEED_MESSAGE';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';

export const wsStart = () => ({
  type: WS_CONNECTION_START
})*/
