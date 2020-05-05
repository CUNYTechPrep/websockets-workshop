const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 8000;

// Setup express
app.get('/ok', (req, res) => {
  res.json({ msg: 'Server is ok' });
})


// Setup socket.io
io.on('connection', (socket) => {
  console.log('a new connection');

  socket.on('message', (text) => {
    let processedMsg = `socket ${socket.id} sent: ${text}`;
    console.log(processedMsg);
    socket.broadcast.emit('message', processedMsg);
  })

});



// Start the server
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
