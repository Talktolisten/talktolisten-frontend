import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { View, SafeAreaView, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
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
  renderDay
} from "./MessageBubble";
import { sendMessageToBackend_GroupChat, fetchAllMessages_GroupChat } from "./MessageSendRequest";
import CharacterProfileModal from "../CharacterProfileScreen/CharacterProfileModal";
import { get_bot_info } from "../../axios/bots";
import { get_group_chat_by_id } from "../../axios/groupchat";

const MessageGroup = () => {
  const route = useRoute();
  const { group_bots, group_chat_id } = route.params;
  const [groupChatInfo, setGroupChatInfo] = useState(null);
  const [bots, setBots] = useState(group_bots);
  const [botInfo, setBotInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (groupChatInfo && groupChatInfo.group_chat_name) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: groupChatInfo.group_chat_profile_picture }}
              style={styles.headerImage}
            />
            <Text style={styles.headerTitleText}>{groupChatInfo.group_chat_name}</Text>
          </View>
        ),
      });
    }
  }, [groupChatInfo, navigation]);

  // useEffect(() => {
  //   const fetchBotInfo = async () => {
  //     try {
  //       const jsonData = await get_bot_info(bot_id);
  //       setBotInfo(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching bot info:", error);
  //     }
  //   };

  //   if (bot_id) {
  //     fetchBotInfo();
  //   }
  // }, [bot_id]);

  useEffect(() => {
    const fetchChatInfo = async () => {
      try {
        const jsonData = await get_group_chat_by_id(group_chat_id);
        setGroupChatInfo(jsonData);
      } catch (error) {
        console.error("Error fetching bot info:", error);
      }
    };

    if (group_chat_id) {
      fetchChatInfo();
    }
  }, [group_chat_id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchAllMessages_GroupChat(group_chat_id);
        const validMessages = fetchedMessages.filter((msg) => {
          if (msg.is_bot) {
            return bots.find((bot) => bot.bot_id === msg.created_by_bot);
          }
          return true;
        });
        const formattedMessages = validMessages.map((msg) => {
          const bot = bots.find((bot) => bot.bot_id === msg.created_by_bot);
          return {
            _id: msg.message_id,
            text: msg.message,
            createdAt: new Date(msg.created_at),
            user: {
              _id: msg.is_bot && bot ? bot.bot_id : 1,
              name: msg.is_bot && bot ? bot.bot_name : "User",
              avatar: msg.is_bot && bot ? bot.profile_picture : null,
            },
          };
        });
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [group_chat_id, bots]);

  const onSend = useCallback(
    (messages = []) => {
      if (isSending) return;

      setIsSending(true);

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      const sendMessage = async () => {
        try {
          const response = await sendMessageToBackend_GroupChat(
            messages[0].text,
            group_chat_id
          );
          if (response && response.message_id && response.message) {
            const botMessage = {
              _id: response.message_id,
              text: response.message,
              createdAt: new Date(response.created_at),
              user: {
                _id: 2,
                name: response.bot_name,
                avatar: bots.find((bot) => bot.bot_id === response.bot_id).profile_picture,
              },
            };

            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, [botMessage])
            );
          }
        } catch (error) {
          console.error("Failed to send message to backend:", error);
        } finally {
          setIsSending(false);
        }
      };

      sendMessage();
    },
    [group_chat_id, bots, isSending]
  );

  const scrollToBottomComponent = () => {
    return getIcon("icon-park:down", 35, "#2e64e5");
  };

  const onPressAvatar = (user) => {
    setBotInfo(bots.find((bot) => bot.bot_id === user._id));
    toggleModal();
  }

  const toggleModal = () => {
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
        onPressAvatar={onPressAvatar}
        alwaysShowSend
        renderSend={(props) => renderSend({ ...props, isSending })}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        // renderActions={(props) => renderActions(props, botInfo, chat_id)}
        renderTime={renderTime}
        renderDay={renderDay}
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

export default MessageGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  messageContainer: {
    backgroundColor: COLORS.white,
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
