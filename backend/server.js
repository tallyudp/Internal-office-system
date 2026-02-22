const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow CORS for local network access
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// In-memory rooms object
// rooms = { room1: { message, priority, timestamp }, ... }
const rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Send initial state to the connected client
  socket.emit('initial_state', rooms);

  // When admin sends a task
  socket.on('send_task', (payload) => {
    console.log('Received task:', payload);
    const { roomId, message, priority, timestamp } = payload;
    
    // Update in-memory state
    rooms[roomId] = { message, priority, timestamp };

    // Emit to all clients so TVs can update
    io.emit('task_update', rooms);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Access on your local network using your machine's IP address (e.g., http://<YOUR_IP>:5000)`);
});
