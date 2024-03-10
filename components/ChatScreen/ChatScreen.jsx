import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from 'react-native-gesture-handler';

import DynamicSearchBar from "./SearchBar";
import "./styles";
import Chat from "./Chat";
import { get_all_chats, delete_chat } from "../../axios/chat";

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const userId = useSelector((state) => state.user.userID);

  useFocusEffect(
    useCallback(() => {
      const fetchChats = async () => {
        if (userId) {
          try {
            const fetchedChats = await get_all_chats(userId);
            setChats(fetchedChats);
          } catch (error) {
            console.error("Failed to fetch chats:", error);
          }
        }
      };

      fetchChats();
    }, [userId])
  );

  const renderRightActions = (progress, dragX, chatId) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const onDeletePress = async () => {
      try {
        await delete_chat(chatId);
        setChats((currentChats) => currentChats.filter((chat) => chat.chat_id !== chatId));
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    };

    return (
      <View style={styles.rightAction}>
        <TouchableOpacity onPress={onDeletePress}>
          <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DynamicSearchBar />
      <View style={styles.listSection}>
        <ScrollView style={styles.elementPallet}>
          {chats.map((chat) => (
            <Swipeable key={chat.chat_id}
              renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, chat.chat_id)}
            >
              <Chat chat={chat} />
            </Swipeable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
