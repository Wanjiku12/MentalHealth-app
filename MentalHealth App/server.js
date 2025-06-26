const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Serve static files (for development)
app.use(express.static(path.join(__dirname, 'MentalHealth App')));

// Socket.io chat logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room for therapist-patient chat
  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });

  // Relay chat messages to the room
  socket.on('chatMessage', ({ room, message, sender }) => {
    io.to(room).emit('chatMessage', { message, sender, time: new Date().toLocaleTimeString() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 