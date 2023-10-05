alert('Hello, world!');

// content.js (код, который выполняется на веб-странице)
const socket = io('ws://localhost:3000'); // Укажите URL вашего сервера

// Функция для отправки сообщения на сервер
function sendMessage(message) {
  socket.emit('message', message);
}

// Пример использования
sendMessage('Привет, сервер!');

// Функция для обработки сообщений от сервера
socket.on('message', (data) => {
  alert(data); // Отображение сообщения через alert
});
