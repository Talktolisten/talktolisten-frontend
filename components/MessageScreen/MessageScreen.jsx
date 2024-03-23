import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { View, SafeAreaView, StyleSheet, Image, Text } from "react-native";
import { GiftedChat, Send, MessageText } from "react-native-gifted-chat";
import { useRoute, useNavigation } from "@react-navigation/native";

import { getIcon } from "../Icons";
import { COLORS, FONTSIZE, FONT_WEIGHT } from "../../styles";

import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "./MessageInput";
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
  renderTime,
} from "./MessageBubble";
import { sendMessageToBackend, fetchAllMessages } from "./MessageSendRequest";
import CharacterProfileModal from "../CharacterProfileScreen/CharacterProfileModal";
import { get_bot_info } from "../../axios/bots";

const MessageScreen = () => {
  const route = useRoute();
  const { bot_id, chat_id } = route.params;
  const [botInfo, setBotInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (botInfo && botInfo.bot_name) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: botInfo.profile_picture }}
              style={styles.headerImage}
            />
            <Text style={styles.headerTitleText}>{botInfo.bot_name}</Text>
          </View>
        ),
      });
    }
  }, [botInfo, navigation]);

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
    const fetchMessages = async () => {
      if (!botInfo) return;

      try {
        const fetchedMessages = await fetchAllMessages(chat_id);
        const formattedMessages = fetchedMessages.map((msg) => ({
          _id: msg.message_id,
          text: msg.message,
          createdAt: new Date(msg.created_at),
          user: {
            _id: msg.is_bot ? 2 : 1,
            name: msg.is_bot ? botInfo.bot_name : "User",
            avatar: msg.is_bot ? botInfo.profile_picture : null,
          },
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (botInfo) {
      fetchMessages();
    }
  }, [chat_id, botInfo]);

  const onSend = useCallback(
    (messages = []) => {
      if (!botInfo) return;

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      const sendMessage = async () => {
        try {
          const response = await sendMessageToBackend(
            messages[0].text,
            chat_id
          );
          if (response && response.message_id && botInfo) {
            const botMessage = {
              _id: response.message_id,
              text: response.message,
              createdAt: new Date(response.created_at),
              user: {
                _id: 2,
                name: botInfo.bot_name,
                avatar: botInfo.profile_picture,
              },
            };

            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, [botMessage])
            );
          }
        } catch (error) {
          console.error("Failed to send message to backend:", error);
        }
      };

      sendMessage();
    },
    [botInfo, chat_id]
  );

  const scrollToBottomComponent = () => {
    return getIcon("icon-park:down", 35, "#2e64e5");
  };

  const toggleModal = () => {
    console.log(botInfo);
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        minInputToolbarHeight={60}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        // renderCustomView={renderCustomView}
        isCustomViewBottom
        renderAvatarOnTop
        renderAvatar={renderAvatar}
        onPressAvatar={toggleModal}
        alwaysShowSend
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderActions={(props) => renderActions(props, botInfo, chat_id)}
        renderTime={renderTime}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        messagesContainerStyle={styles.messageContainer}
      />
      <CharacterProfileModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        selectedBotInfo={botInfo}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  messageContainer: {
    backgroundColor: COLORS.white,
    marginLeft: 10,
  },
  headerTitleText: {
    fontSize: FONTSIZE.small,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 40,
  }
});
