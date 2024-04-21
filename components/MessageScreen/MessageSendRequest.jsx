import Api from "../../axios/api";
import { getUserID } from "../../util/tokenUtils";

export const create_new_message = async (messageText, chat_id) => {
  return await Api({
    method: "POST",
    url: `/api/v1/chat/${chat_id}/message`,
    data: {
      message: messageText,
      created_by_user: await getUserID(),
      is_bot: false,
    },
  }).then((res) => {
    return res.data;
  });
};

export const create_new_message_GroupChat = async (messageText, group_chat_id) => {
  return await Api({
    method: "POST",
    url: `/api/v1/groupchat/${group_chat_id}/message`,
    data: {
      message: messageText,
      created_by_user: await getUserID(),
      is_bot: false,
    },
  }).then((res) => {
    return res.data;
  });
};

export const sendMessageToBackend = async (messageText, chat_id) => {
  try {
    const response = await create_new_message(messageText, chat_id);
    return response;
  } catch (error) {
    console.error("Failed to send message to backend:", error);
  }
};

export const sendMessageToBackend_GroupChat = async (messageText, chat_id) => {
  try {
    const response = await create_new_message_GroupChat(messageText, chat_id);
    return response;
  } catch (error) {
    console.error("Failed to send message to backend:", error);
  }
};

export const fetchAllMessages = async (chat_id) => {
  return await Api({
    method: "GET",
    url: `/api/v1/chat/${chat_id}/message`,
  }).then((res) => {
    return res.data;
  });
};


export const fetchAllMessages_GroupChat = async (group_chat_id) => {
  return await Api({
    method: "GET",
    url: `/api/v1/groupchat/${group_chat_id}/messages`,
  }).then((res) => {
    return res.data;
  });
};
