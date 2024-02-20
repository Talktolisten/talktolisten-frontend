import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import DynamicSearchBar from "./SearchBar";
import "./styles";
import Chat from "./Chat";
import { get_all_chats } from "./ChatGet";

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

  return (
    <SafeAreaView style={styles.container}>
      <DynamicSearchBar />
      <View style={styles.listSection}>
        <ScrollView style={styles.elementPallet}>
          {chats.map((chat) => (
            <Chat key={chat.chat_id} chat={chat} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
