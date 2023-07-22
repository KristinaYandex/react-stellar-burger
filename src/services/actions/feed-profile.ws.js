import { createAction } from "@reduxjs/toolkit";

export const connectProfile = createAction('FEED_CONNECT_PROFILE');
export const disconnectProfile = createAction('FEED_DISCONNECT_PROFILE');
export const wsConnectingProfile = createAction('FEED_WS_CONNECTING_PROFILE');
export const wsOpenProfile = createAction('FEED_WS_OPEN_PROFILE');
export const wsCloseProfile = createAction('FEED_WS_CLOSE_PROFILE');
export const wsMessageProfile = createAction('FEED_WS_GET_MESSAGE_PROFILE');
export const wsErrorProfile = createAction('FEED_WS_ERROR_PROFILE');