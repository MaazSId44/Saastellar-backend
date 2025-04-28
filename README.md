
# SaasTellar - Real-Time Transcription Server

This is the backend server built with **Node.js** and **WebSocket** to provide real-time audio transcription using **Deepgram API**.

## Technologies Used

- Node.js
- Express.js
- WebSocket (`ws`)
- MongoDB (Mongoose)
- Deepgram SDK
- CORS
- dotenv

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/MaazSId44/Saastellar-backend.git
cd backend-folder
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the root of your backend folder and add the following:

```env
PORT=8000
DATABASE_URL=""
BASE_URL=""
DEEPGRAM_API_KEY=""
```

---

### 4. Running the Server

```bash
npm run dev
```
or

```bash
node server.js
```

---

## Folder Structure

```
├── config/
│   └── connectdb.js          # MongoDB connection setup
├── controllers/
│   └── websocketController.js # WebSocket handling logic
├── services/
│   └── deepgramService.js     # Deepgram client service
├── utils/
│   └── getReplyFromScript.js  # Scripted replies based on user speech
├── staticReplies.js           # Predefined responses
├── public/                    # Static files (optional)
├── index.js                   # Server entry point
├── .env                        # Environment variables
└── package.json
```

---

## Features

- WebSocket server for real-time audio streaming.
- Audio data forwarded to Deepgram for live transcription.
- Automatic replies based on keywords matched from user's speech.
- MongoDB integration (prepared).
- Single active WebSocket connection enforced (only one client at a time).

---

## Important Scripts

- `index.js`: Initializes Express server, WebSocket server, and MongoDB.
- `websocketController.js`: Manages WebSocket connection and Deepgram integration.
- `deepgramService.js`: Configures Deepgram client.
- `getReplyFromScript.js`: Matches user input to predefined scripted replies.

---

## Requirements

- Node.js >= 14
- MongoDB running instance
- Deepgram API Key

---

## License

This project is licensed under the MIT License.

