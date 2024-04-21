import Api from "./api";

export const get_all_group_chats = async (userId) => {
    return await Api({
        method: "GET",
        url: `api/v1/groupchat/${userId}`,
    }).then((res) => {
        return res.data;
    });
};

export const get_group_chat_by_id = async (group_chat_id) => {
    return await Api({
        method: "GET",
        url: `api/v1/groupchat/get_chat_by_id/${group_chat_id}`,
    }).then((res) => {
        return res.data;
    });
};

export const create_group_chat = async (group_chat_name, group_bots) => {
    return await Api({
        method: "POST",
        url: `api/v1/groupchat/create`,
        data: {
            group_chat_name,
            group_bots,
        },
    }).then((res) => {
        return res.data;
    });
}

export const delete_group_chat = async (group_chat_id) => {
    return await Api({
        method: "DELETE",
        url: `api/v1/groupchat/${group_chat_id}`,
    }).then((res) => {
        return res.data;
    });
}