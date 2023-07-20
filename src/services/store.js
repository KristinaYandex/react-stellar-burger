import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/socket-middleware';
import { connect, disconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } from './actions/feed.ws';
import { connectProfile, disconnectProfile, wsConnectingProfile, wsOpenProfile, wsCloseProfile, wsMessageProfile, wsErrorProfile } from './actions/feed-profile.ws';

const feedMiddleware = socketMiddleware ({
  wsConnect: connect, 
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
  wsConnecting: wsConnecting,
  wsDisconnect: disconnect
})

const feedProfileMiddleware = socketMiddleware ({
  wsConnect: connectProfile, 
  onOpen: wsOpenProfile,
  onClose: wsCloseProfile,
  onError: wsErrorProfile,
  onMessage: wsMessageProfile,
  wsConnecting: wsConnectingProfile,
  wsDisconnect: disconnectProfile
})

const generalStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, feedProfileMiddleware)
  }
})

export default generalStore;