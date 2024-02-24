import { createAction } from "@reduxjs/toolkit";

export const connectProfile = createAction<string>('FEED_CONNECT_PROFILE');
export const disconnectProfile = createAction('FEED_DISCONNECT_PROFILE');
export const wsConnectingProfile = createAction('FEED_WS_CONNECTING_PROFILE');
export const wsOpenProfile = createAction('FEED_WS_OPEN_PROFILE');
export const wsCloseProfile = createAction('FEED_WS_CLOSE_PROFILE');
export const wsMessageProfile = createAction('FEED_WS_GET_MESSAGE_PROFILE');
export const wsErrorProfile = createAction<string>('FEED_WS_ERROR_PROFILE');
export const wsSendMessageProfile = createAction('FEED_WS_SEND_MESSAGE_PROFILE');

export type TWsProfileActions = {
  wsConnect: typeof connectProfile;
  onOpen: typeof wsOpenProfile;
  onClose: typeof wsCloseProfile;
  onError: typeof wsErrorProfile;
  onMessage: typeof wsMessageProfile;
  wsConnecting: typeof wsConnectingProfile;
  wsDisconnect: typeof disconnectProfile;
  wsSendMessage: typeof wsSendMessageProfile;
}

export const WsActionsProfile: TWsProfileActions = {
  wsConnect: connectProfile,
  onOpen: wsOpenProfile,
  onClose: wsCloseProfile,
  onError: wsErrorProfile,
  onMessage: wsMessageProfile,
  wsConnecting: wsConnectingProfile,
  wsDisconnect: disconnectProfile,
  wsSendMessage: wsSendMessageProfile
}

export type TWsConnectProfile = ReturnType<typeof connectProfile>

export type TOnOpenProfile = ReturnType<typeof wsOpenProfile>

export type TOnCloseProfile = ReturnType<typeof wsCloseProfile>

export type TOnErrorProfile = ReturnType<typeof wsErrorProfile> & {error: string}

export type TOnMessageProfile = ReturnType<typeof wsMessageProfile>

export type TWsConnectingProfile = ReturnType<typeof wsConnectingProfile>

export type TWsDisconnectProfile = ReturnType<typeof disconnectProfile>

export type TWsSendMessageProfile = ReturnType<typeof wsSendMessageProfile>

export type TFeedProfileActions = 
  | TWsConnectProfile
  | TOnOpenProfile
  | TOnCloseProfile
  | TOnErrorProfile
  | TOnMessageProfile
  | TWsConnectingProfile
  | TWsDisconnectProfile
  | TWsSendMessageProfile