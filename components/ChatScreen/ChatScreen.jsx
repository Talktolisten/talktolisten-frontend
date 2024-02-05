import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
} from "react-native";

import DynamicSearchBar from "../ExploreScreen/SearchBar";

import "./styles";
import Chat from "./Chat";
import { get_all_chats } from "./ChatGet";
import { getUserID } from "../../util/tokenUtils";

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const userId = getUserID(); // Assuming getUserID returns the current user's ID synchronously

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const fetchedChats = await get_all_chats(userId);
        setChats(fetchedChats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <DynamicSearchBar />
      <View style={styles.listSection}>
        <ScrollView style={styles.elementPallet}>
          {chats.map((chat) => (
            <Chat key={chat.id} chat={chat} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
