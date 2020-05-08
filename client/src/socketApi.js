import io from 'socket.io-client';

const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log('connected as', socket.id);
});


function sendMessage(text) {
  socket.emit('message', text);
}

function subscribeToMessages(messageHandler) {
  socket.on('message', text => messageHandler(text));
}

export {
  sendMessage,
  subscribeToMessages,
}