import Api from "./api";

export const get_all_chats = async (userId) => {
  return await Api({
    method: "GET",
    url: `api/v1/chat/${userId}`,
  }).then((res) => {
    return res.data;
  });
};

export const delete_chat = async (chat_id) => {
  return await Api({
    method: "DELETE",
    url: `api/v1/chat/${chat_id}`,
  }).then((res) => {
    return res.data;
  });
};
