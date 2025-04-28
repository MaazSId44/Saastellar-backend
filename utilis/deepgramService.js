const fs = require("fs");
const { createClient } = require("@deepgram/sdk");
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const deepgram = createClient(DEEPGRAM_API_KEY);

async function transcribeAudio(audioBuffer) {
  try {
    const response = await deepgram.transcription.preRecorded(
      {
        stream: fs.readFileSync(audioBuffer), // Read file buffer
        mimetype: "audio/webm", // Specify mimetype
      },
      {
        model: "nova-3", // Specify transcription model
      }
    );

    // Get the transcript from the response
    const transcript = response.results.channels[0].alternatives[0].transcript;
    return transcript || "";
  } catch (error) {
    console.error("Deepgram transcription error:", error);
    return "";
  }
}

module.exports = { transcribeAudio };
