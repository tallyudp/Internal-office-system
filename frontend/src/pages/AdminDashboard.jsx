import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to the socket server at port 5000 on the same host
const socket = io(`http://${window.location.hostname}:5000`);

const roomsList = ['room1', 'room2', 'room3', 'room4', 'room5'];

function AdminDashboard() {
    const [roomId, setRoomId] = useState(roomsList[0]);
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('Low');

    const handleSendTask = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const payload = {
            roomId,
            message,
            priority,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };

        socket.emit('send_task', payload);
        setMessage(''); // clear message after sending
    };

    const handleClearTask = (e) => {
        e.preventDefault();
        const payload = {
            roomId,
            message: '',
            priority: 'Low',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };

        socket.emit('send_task', payload);
        setMessage('');
    };

    return (
        <div className="admin-container">
            <div className="admin-panel">
                <h1 className="admin-title">Admin Dashboard</h1>

                <form onSubmit={handleSendTask}>
                    <div className="form-group">
                        <label htmlFor="room">Select Room</label>
                        <select
                            id="room"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        >
                            {roomsList.map(r => (
                                <option key={r} value={r}>{r.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Task Message</label>
                        <input
                            type="text"
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter task... (e.g. Please bring coffee)"
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-send">Send Task</button>
                        <button type="button" className="btn-clear" onClick={handleClearTask}>Clear Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminDashboard;
