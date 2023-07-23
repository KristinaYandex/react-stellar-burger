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