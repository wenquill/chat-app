const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { Message } = require('./models');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  socket.on('NEW_MESSAGE', async payload => {
    try {
      const createdMessage = await Message.create(payload);
      io.emit('NEW_MESSAGE_SUCCESS', createdMessage);
    } catch (err) {
      socket.emit('NEW_MESSAGE_ERROR', {
        error: err.message ?? 'Error',
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
