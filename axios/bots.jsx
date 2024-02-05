import Api from "./api";

export const get_bot_info = async (botId) => {
    return await Api({
        method:'GET',
        url: `api/v1/explore/${botId}`,
    }).then(res => {
        return res.data;
     });
};