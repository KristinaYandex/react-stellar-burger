import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/socket-middleware';
import { middlewareProfile } from './middleware/middleware-profile';

const generalStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    .concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all')/*, middlewareProfile('wss://norma.nomoreparties.space/orders')*/)
})

export default generalStore;