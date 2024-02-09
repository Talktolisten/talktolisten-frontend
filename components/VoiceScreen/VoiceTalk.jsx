import Api from "../../axios/api";
import * as FileSystem from "expo-file-system";


export const voice_talk = async (chat_id, bot_id, base64Audio) => {
    const payload = {
        chat_id: chat_id,
        bot_id: bot_id,
        audio: base64Audio,
    };
    console.log(typeof base64Audio);
    
    const config = {
        method: 'POST',
        url: `/api/v1/chat/process_audio/${chat_id}`,
        data: payload,
    };
    try {
        const response = await Api(config);
        return response.data;
    } catch (error) {
        console.error('Error uploading audio:', error);
        throw error;
    }
};