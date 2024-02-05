import Api from "../../axios/api";

export const get_all_chats = async (userId) => {
    return await Api({
        method: "GET",
        url: `api/v1/chat/${userId}`,
    }).then((res) => {
        return res.data;
    });
};