const { Server } = require('socket.io');
const { Message } = require('./models');
const {
  SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_SUCCESS, NEW_MESSAGE_ERROR },
} = require('./constants');

const initSocket = httpServer => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', socket => {
    socket.on(NEW_MESSAGE, async payload => {
      try {
        const createdMessage = await Message.create(payload);
        io.emit(NEW_MESSAGE_SUCCESS, createdMessage);
      } catch (err) {
        socket.emit(NEW_MESSAGE_ERROR, {
          error: err.message ?? 'Error',
        });
      }
    });
  });
};

module.exports = initSocket;
