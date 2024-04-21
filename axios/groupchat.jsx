import Api from "./api";

export const get_all_group_chats = async (userId) => {
    return await Api({
        method: "GET",
        url: `api/v1/groupchat/${userId}`,
    }).then((res) => {
        return res.data;
    });
};

export const delete_group_chat = async (group_chat_id) => {
    return await Api({
        method: "DELETE",
        url: `api/v1/groupchat/${group_chat_id}`,
    }).then((res) => {
        return res.data;
    });
}