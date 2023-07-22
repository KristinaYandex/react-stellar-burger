export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

  return next => action => {
    const { dispatch } = store;
    const { type } = action;

    const {
      wsConnect,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      wsConnecting,
      wsDisconnect,
    } = wsActions;
 
    if (type === wsConnect.type) {
      // объект класса WebSocket
      socket = new WebSocket(action.payload);/*Передадим url при подключении*/ 
      dispatch(wsConnecting());
    }

    if (socket) {
      // функция, которая вызывается при открытии сокета
      socket.onopen = () => {
        dispatch(onOpen());
      };

      // функция, которая вызывается при ошибке соединения
      socket.onerror = () => {
        dispatch(onError("Error"));
      };

      // функция, которая вызывается при получении события от сервера
      socket.onmessage = event => {
        const { data } = event;
        const parseData = JSON.parse(data);
        dispatch(onMessage(parseData));
      };
      // функция, которая вызывается при закрытии соединения
      socket.onclose = () => {
        dispatch(onClose());
      };

      if (wsSendMessage && type === wsSendMessage.type) {
        socket.send(JSON.stringify(action.payload));
      }

      if (wsDisconnect.type === type) {
        socket.close();
        socket = null;
      }
    }
    next(action);
  };
  };
}; 


/*export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;
      if (type === wsInit && user) {
        socket = new WebSocket(`${wsUrl}?token=${user.token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: user.token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};


import {
  WS_USER_NAME_UPDATE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../action-types';

const initialState = {
  wsConnected: false,
  messages: []
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]

    case WS_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import thunkMiddleware from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './action-types';

const wsUrl = 'wss://norma.nomoreparties.space/chat';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware), applyMiddleware(socketMiddleware(wsUrl, wsActions))) // Ваш код здесь
  );*/