import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/socket-middleware';
import { WsActions } from './actions/feed.ws';
import { WsActionsProfile } from './actions/feed-profile.ws';

/*const feedMiddleware = socketMiddleware ({
  wsConnect: connect, 
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
  wsConnecting: wsConnecting,
  wsDisconnect: disconnect
})*/

/*const feedProfileMiddleware = socketMiddleware ({
  wsConnect: connectProfile, 
  onOpen: wsOpenProfile,
  onClose: wsCloseProfile,
  onError: wsErrorProfile,
  onMessage: wsMessageProfile,
  wsConnecting: wsConnectingProfile,
  wsDisconnect: disconnectProfile
})*/

const generalStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware(WsActions), (socketMiddleware(WsActionsProfile)))
  }
})

export default generalStore;