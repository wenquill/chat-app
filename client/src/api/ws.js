import { io } from 'socket.io-client';
import {
  newMessageError,
  newMessageSuccess,
  deleteMessageSuccess,
  deleteMessageError
} from '../store/slices/messagesSlice';
import CONSTANTS from '../constants';

const {
  SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_ERROR, NEW_MESSAGE_SUCCESS, DEL_MESSAGE, DEL_MESSAGE_SUCCESS, DEL_MESSAGE_ERROR },
} = CONSTANTS;

const socket = io('ws://localhost:5000');

export const createMessage = payload => socket.emit(NEW_MESSAGE, payload);

export const deleteMessage = payload => socket.emit(DEL_MESSAGE, payload);

export const bringStoreToSocket = store => {
  socket.on(NEW_MESSAGE_SUCCESS, payload => {
    store.dispatch(newMessageSuccess(payload));
  });

  socket.on(NEW_MESSAGE_ERROR, error => {
    store.dispatch(newMessageError(error));
  });

  socket.on(DEL_MESSAGE_SUCCESS, payload => {
    store.dispatch(deleteMessageSuccess(payload));
  });

  socket.on(DEL_MESSAGE_ERROR, error => {
    store.dispatch(deleteMessageError(error));
  });
};
