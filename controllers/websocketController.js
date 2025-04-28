const { deepgram, LiveTranscriptionEvents } = require("../services/deepgramService");
const getReplyFromScript = require("../utilis/getReplyFromScript");

let activeWebSocketConnection = null;

function handleWebSocketConnection(ws) {
  if (activeWebSocketConnection) {
    console.log("WebSocket connection already exists. Rejecting new connection.");
    ws.close();
    return;
  }

  activeWebSocketConnection = ws;
  console.log("New WebSocket client connected");

  const dgConnection = deepgram.listen.live({
    model: "nova",
    encoding: "linear16",
    sample_rate: 16000,
    channels: 1,
  });

  dgConnection.on(LiveTranscriptionEvents.Error, (err) => {
    console.error("Error in Deepgram connection:", err);
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "error", message: "Deepgram error" }));
    }
  });

  dgConnection.on(LiveTranscriptionEvents.Transcript, (data) => {
    const transcriptText = data?.channel?.alternatives[0]?.transcript?.trim().toLowerCase();
    if (transcriptText) {
      console.log("Received Transcript:", transcriptText);
      const staticReply = getReplyFromScript(transcriptText);
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "transcription", agentReply: staticReply, userText: transcriptText }));
      }
    } else {
      console.error("Transcript data is missing or malformed");
    }
  });

  dgConnection.on(LiveTranscriptionEvents.Open, () => {
    ws.on("message", (message) => {
      if (message instanceof Buffer) {
        dgConnection.send(message);
      } else {
        ws.send(JSON.stringify({ type: "error", message: "Invalid audio data received" }));
      }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    if (dgConnection && typeof dgConnection.close === "function") {
      dgConnection.close();
    }
    activeWebSocketConnection = null;
  });
}

module.exports = handleWebSocketConnection;
