import { createClient } from "@deepgram/sdk";

const options = {
  model: "nova-2-conversationalai",
  interim_results: true,
  smart_format: true,
  encoding: "linear16",
  sample_rate: 44100,
  channels: 1,
  utterance_end_ms: 3000,
};

export const createDeepgramConnection = () => {
  const deepgram = createClient(process.env.EXPO_PUBLIC_DEEPGRAM_API_KEY);

  const connection = deepgram.listen.live(options);

  return connection;
};
