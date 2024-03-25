import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import LiveAudioStream from 'react-native-live-audio-stream';


export function startConnection() {
    const deepgram = createClient(process.env.EXPO_PUBLIC_DEEPGRAM_API_KEY);
    const connection = deepgram.listen.live({ model: "nova-2-conversationalai" });

    connection.on(LiveTranscriptionEvents.Open, () => {
        console.log("Connection opened");
    });

    connection.on(LiveTranscriptionEvents.Close, (event) => {
        console.log("Connection closed", event);
    });

    connection.on(LiveTranscriptionEvents.Transcript, (results) => {
        console.log("Received transcription results", results);
    });

    connection.on(LiveTranscriptionEvents.Metadata, (metadata) => {
        console.log("Received metadata", metadata);
    });

    connection.on(LiveTranscriptionEvents.Error, (error) => {
        console.error("An error occurred", error);
    });

    connection.on(LiveTranscriptionEvents.Warning, (warning) => {
        console.warn("Received a warning", warning);
    });

    return connection;
}