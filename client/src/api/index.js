import axios from 'axios';
import { io } from 'socket.io-client';
import { newMessageSuccess } from '../store/slices/messagesSlice';
import store from '../store'
const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

const socket = io('ws://localhost:5000');

export const createMessage = payload => socket.emit('NEW_MESSAGE', payload);

socket.on('NEW_MESSAGE_SUCCESS', payload => {
  store.dispatch(newMessageSuccess(payload));
});

socket.on('NEW_MESSAGE_ERROR', error => {
  console.log('error :>> ', error);
});
