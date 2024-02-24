import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string>('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction('FEED_WS_GET_MESSAGE');
export const wsError = createAction<string>('FEED_WS_ERROR');
export const wsSendMessage = createAction('FEED_WS_SEND_MESSAGE');

console.log(wsConnecting);

export type TWsActions = {
  wsConnect: typeof connect;
  onOpen: typeof wsOpen;
  onClose: typeof wsClose;
  onError: typeof wsError;
  onMessage: typeof wsMessage;
  wsConnecting: typeof wsConnecting;
  wsDisconnect: typeof disconnect;
  wsSendMessage: typeof wsSendMessage;
}

export const WsActions: TWsActions = {
  wsConnect: connect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
  wsConnecting: wsConnecting,
  wsDisconnect: disconnect,
  wsSendMessage: wsSendMessage
}

export type TWsConnect = ReturnType<typeof connect>

export type TOnOpen = ReturnType<typeof wsOpen>

export type TOnClose = ReturnType<typeof wsClose>

export type TOnError = ReturnType<typeof wsError> & {error: string}

export type TOnMessage = ReturnType<typeof wsMessage>

export type TWsConnecting = ReturnType<typeof wsConnecting>

export type TWsDisconnect = ReturnType<typeof disconnect>

export type TWsSendMessage = ReturnType<typeof wsSendMessage>

export type TFeedActions = 
  | TWsConnect
  | TOnOpen
  | TOnClose
  | TOnError
  | TOnMessage
  | TWsConnecting
  | TWsDisconnect
  | TWsSendMessage