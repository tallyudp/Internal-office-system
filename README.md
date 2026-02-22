# Local Network Office Room Task Display System

A real-time task display system for offices running over local Wi-Fi. Features an Admin Dashboard for sending tasks and real-time updating TV display screens for specific rooms.

## Tech Stack
- **Backend:** Node.js, Express, Socket.io
- **Frontend:** React (Vite), React Router, Socket.io Client

---

## 📂 Folder Structure

```
task-display-system/
│
├── backend/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── pages/
│           ├── AdminDashboard.jsx
│           └── TVDisplay.jsx
│
└── README.md
```

## 🚀 Installation & Setup

You will need two terminal windows to run both the frontend and the backend.

### 1️⃣ Setup Backend

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 5000):
   ```bash
   npm start
   ```

### 2️⃣ Setup Frontend

1. Open a second terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app, listening on your local IP address:
   ```bash
   npm run dev -- --host
   ```
   *Note: Adding `--host` allows devices on your local Wi-Fi to access the Vite server.*

---

## 📺 How to Use

1. Find your computer's local IPv4 address (e.g. `192.168.1.100`):
   - **Windows:** Run `ipconfig` in CMD
   - **Mac/Linux:** Run `ifconfig` or `ip a`

2. **Admin Dashboard:**
   Open a browser on the server machine or any device on the network:
   ```text
   http://192.168.1.100:5173/
   ```

3. **TV Display Screens:**
   On the TV browser or any room tablet connected to the same Wi-Fi, open:
   ```text
   http://192.168.1.100:5173/display/room1
   ```
   *Change `room1` to `room2`, `room3`, etc., for different TVs.*

4. **Sending Tasks:**
   - In the Admin Dashboard, select the required room.
   - Type a task, select priority, and click **Send Task**.
   - The TV assigned to that room will update instantly.

## 🎨 UI Features
- Dark premium theme designed for high visibility on TVs.
- Color codes for priority: Green for Low, Orange for Medium, and Red for High.
- Auto-updating timestamp.
