export const middlewareProfile = wsUrl => {
  return store => {
    let socket = null;

  return next => action => {
    const { dispatch, getState } = store;
    const { type } = action;

    const { user } = getState().user;
 
    if (type === 'WS_PROFILE_CONNECTION_START') {
      // объект класса WebSocket
      socket = new WebSocket(`${wsUrl}?token=${user.token}`);
    }

    if (socket) {
      // функция, которая вызывается при открытии сокета
      socket.onopen = event => {
        dispatch({ type: 'WS_PROFILE_CONNECTION_SUCCESS', payload: event });
      };

      // функция, которая вызывается при ошибке соединения
      socket.onerror = event => {
        dispatch({ type: 'WS_PROFILE_CONNECTION_ERROR', payload: event });
      };

      // функция, которая вызывается при получении события от сервера
      socket.onmessage = event => {
        const { data } = event;
        const parseData = JSON.parse(data);
        dispatch({ type: 'WS_PROFILE_GET_FEED_MESSAGE', payload: parseData });
      };
      // функция, которая вызывается при закрытии соединения
      socket.onclose = event => {
        dispatch({ type: 'WS_PROFILE_CONNECTION_CLOSED', payload: event });
      };
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