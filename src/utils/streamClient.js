// src/utils/streamClient.js
import { StreamVideo } from "@getstream/video-client";

// Initialize Stream client with API key from environment variables
const client = StreamVideo.connect(process.env.STREAM_API_KEY);

export default client;
