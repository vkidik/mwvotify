const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  // Обработка соединения с браузером
  socket.on('message', (data) => {
    // Пересылка сообщения всем подключенным клиентам
    io.emit('message', data);
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
