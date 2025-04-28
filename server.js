const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("ws");
const { color, log } = require("console-log-colors");

const connectDB = require("./config/connectdb");
const handleWebSocketConnection = require("./controllers/websocketController");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Connect MongoDB
connectDB();

const server = http.createServer(app);

// WebSocket Server
const wss = new Server({ server });

wss.on("connection", (ws) => handleWebSocketConnection(ws));

server.listen(port, () => {
  log(color.cyan(" ******************************************** "));
  log(color.cyan(" *******                              ******* "));
  log(
    color.cyan(` *******   Server started at ${process.env.PORT}     ******* `)
  );
  log(color.cyan(" *******                              ******* "));
  log(color.cyan(" ******************************************** "));
});
