import Api from "../../axios/api";

export const voice_talk = async (chat_id, bot_id, question) => {
    const payload = {
        chat_id: chat_id,
        bot_id: bot_id,
        text: question,
    };

    const config = {
        method: "POST",
        url: `/api/v1/chat/process_audio/${chat_id}`,
        data: payload,
    };
    try {
        const response = await Api(config);
        console.log('receive response');
        return response.data;
    } catch (error) {
        console.error("Error uploading audio:", error);
        throw error;
    }
};

export const voice_talk_group = async (group_chat_id, question) => {
    const payload = {
        group_chat_id: group_chat_id,
        text: question,
    };

    const config = {
        method: "POST",
        url: `/api/v1/groupchat/process_audio/${group_chat_id}`,
        data: payload,
    };
    try {
        const response = await Api(config);
        console.log('receive response');
        return response.data;
    } catch (error) {
        console.error("Error uploading audio:", error);
        throw error;
    }
};