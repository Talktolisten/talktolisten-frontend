import Api from '../../axios/api';
import { getUserID } from '../../util/tokenUtils';

export const create_new_message = async (messageText, chat_id) =>{
    return await Api({
        method:'POST',
        url:`/api/v1/chat/${chat_id}/message`,
        data:{
            message: messageText,
            created_by_user: await getUserID(), 
            is_bot: false,
        }
    }).then(res => {
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


export const fetchAllMessages = async (chat_id) => {
  return await Api({
    method:'GET',
    url:`/api/v1/chat/${chat_id}/message`,
  }).then(res => {
    return res.data;
  });
};