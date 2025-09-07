import { create_new_chat } from "./ExploreRequest";
import { SCREEN_NAMES } from "../../util/constants";

export const handlePressBot = async (botId, navigation) => {
  try {
    const chatId = await create_new_chat(botId);
    navigation.navigate(SCREEN_NAMES.MESSAGE, {
      bot_id: botId,
      chat_id: chatId,
    });
  } catch (error) {
    console.error("Failed to create or get chat session:", error);
  }
};
