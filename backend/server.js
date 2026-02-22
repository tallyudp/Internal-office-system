const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const os = require('os');

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}
const LOCAL_IP = getLocalIp();
const PORT = 5000;

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

// Serve static frontend files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// In-memory rooms object
// rooms = { room1: { message, priority, timestamp }, ... }
const rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Send initial state to the connected client
  socket.emit('initial_state', rooms);
  socket.emit('server_info', { ip: LOCAL_IP });

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

// Catch-all route for React Router (Single Page Application fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Access on your local network using your machine's IP address (e.g., http://<YOUR_IP>:5000)`);
});
