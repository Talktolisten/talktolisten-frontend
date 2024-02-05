import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {GiftedChat, Send, MessageText} from 'react-native-gifted-chat';
import { useRoute } from "@react-navigation/native";

import { getIcon } from '../Icons';
import { COLORS } from '../../styles';

import { renderInputToolbar, renderActions, renderComposer, renderSend } from './MessageInput';
import { renderAvatar, renderBubble, renderSystemMessage, renderMessage, renderMessageText, renderCustomView, renderTime} from './MessageBubble';
import { sendMessageToBackend } from './MessageSendRequest';

import { get_bot_info } from '../../axios/bots';

const MessageScreen = () => {
  const route = useRoute();
  const { bot_id, chat_id } = route.params;
  const [botInfo, setBotInfo] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchBotInfo = async () => {
        try {
            const jsonData = await get_bot_info(bot_id);
            setBotInfo(jsonData);
        } catch (error) {
            console.error("Error fetching bot info:", error);
        }
    };

    if (bot_id) {
        fetchBotInfo();
    }
  }, [bot_id]); 

  useEffect(() => {
      if (botInfo) {
          setMessages([
              {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                      _id: 2,
                      name: botInfo.bot_name,
                      avatar: botInfo.profile_picture,
                  },
              },
          ]);
      }
  }, [botInfo]); 

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    const sendMessage = async () => {
      const response = await sendMessageToBackend(messages[0].text, chat_id);
      const botMessage = {
        _id: response.message_id,
        text: response.message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: botInfo.bot_name,
          avatar: botInfo.profile_picture,
        },
      };
  
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botMessage]),
      );
    };
  
    sendMessage();
  }, []);

  const scrollToBottomComponent = () => {
    return(
      getIcon('icon-park:down', 35, '#2e64e5')
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        minInputToolbarHeight={50}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        // renderCustomView={renderCustomView}
        isCustomViewBottom
        renderAvatarOnTop
        renderAvatar={renderAvatar}
        alwaysShowSend
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderActions={renderActions}
        renderTime={renderTime}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});