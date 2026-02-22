import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io();

function TVDisplay() {
    const { roomId } = useParams();
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        // Ensure display connects to the backend and gets initial state
        socket.on('initial_state', (roomsData) => {
            if (roomsData && roomsData[roomId]) {
                setTaskData(roomsData[roomId]);
            }
        });

        socket.on('task_update', (roomsData) => {
            if (roomsData && roomsData[roomId]) {
                setTaskData(roomsData[roomId]);
            }
        });

        return () => {
            socket.off('initial_state');
            socket.off('task_update');
        };
    }, [roomId]);

    return (
        <div className="tv-container">
            <h1 className="tv-room-title">{roomId.toUpperCase()}</h1>

            {taskData?.timestamp && <div className="tv-timestamp">{taskData.timestamp}</div>}

            <div className="tv-content-wrapper">
                {taskData?.message ? (
                    <>
                        <div className="tv-message">{taskData.message}</div>
                        <div className={`tv-priority priority-${taskData.priority.toLowerCase()}`}>
                            {taskData.priority.toUpperCase()} PRIORITY
                        </div>
                    </>
                ) : (
                    <div className="no-task">No Task Assigned</div>
                )}
            </div>
        </div>
    );
}

export default TVDisplay;
