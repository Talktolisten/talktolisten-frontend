import LiveAudioStream from "react-native-live-audio-stream";

const options = {
  sampleRate: 44100,
  channels: 1,
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  bufferSize: 4096, // default is 2048
};

LiveAudioStream.init(options);

export default LiveAudioStream;
