import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/socket-middleware';
import { connect, disconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } from './actions/feed.ws';

const feedMiddleware = socketMiddleware ({
  wsConnect: connect, 
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
  wsConnecting: wsConnecting,
  wsDisconnect: disconnect
})

const generalStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware)
  }
})

export default generalStore;