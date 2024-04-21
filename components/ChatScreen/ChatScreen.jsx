import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, SafeAreaView, Animated, TouchableOpacity, Text } from "react-native";
import { FAB } from 'react-native-paper';
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import DynamicSearchBar from "./SearchBar";
import "./styles";
import Chat from "./Chat";
import GroupChat from "./GroupChat";
import { SCREEN_NAMES } from "../../util/constants";
import { COLORS } from "../../styles";
import { get_all_chats, delete_chat } from "../../axios/chat";
import { get_all_group_chats, delete_group_chat } from "../../axios/groupchat";

const ChatScreen = () => {
  const [mode, setMode] = useState("chat");
  const [chats, setChats] = useState([]);
  const [groupchats, setGroupChats] = useState([]);
  const navigation = useNavigation();
  const userId = useSelector((state) => state.user.userID);

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

  const fetchGroupChats = async () => {
    if (userId) {
      try {
        const fetchedGroupChats = await get_all_group_chats(userId);
        setGroupChats(fetchedGroupChats);
      } catch (error) {
        console.error("Failed to fetch group chats:", error);
      }
    }
  }

  useFocusEffect(
    useCallback(() => {

      fetchChats();
      fetchGroupChats();
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
        if (mode === 'chat') {
          await delete_chat(chatId);
          setChats((currentChats) => currentChats.filter((chat) => chat.chat_id !== chatId));
        } else {
          await delete_group_chat(chatId);
          setGroupChats((currentGroupChats) => currentGroupChats.filter((groupchat) => groupchat.group_chat_id !== chatId));
        }
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
      <View style={styles.radioButtonContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity style={[styles.radioButton, mode === 'chat' ? styles.radioButtonSelected : {}]} onPress={() => setMode('chat')}>
            <Text style={[styles.radioButtonLabel, mode === 'chat' ? styles.radioButtonLabelSelected : {}]}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.radioButton, mode === 'group-chat' ? styles.radioButtonSelected : {}]} onPress={() => setMode('group-chat')}>
            <Text style={[styles.radioButtonLabel, mode === 'group-chat' ? styles.radioButtonLabelSelected : {}]}>Group Chats</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listSection}>
        <ScrollView style={styles.elementPallet}>
          {mode === 'chat' ? (
            chats.map((chat) => (
              <Swipeable key={chat.chat_id}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, chat.chat_id)}
              >
                <Chat chat={chat} />
              </Swipeable>
            ))
          ) : (
            groupchats.map((groupchat) => (
              <Swipeable key={groupchat.group_chat_id}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, groupchat.group_chat_id)}
              >
                <GroupChat groupchat={groupchat} />
              </Swipeable>
            ))
          )}
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="account-multiple-plus"
          size="medium"
          color={COLORS.white}
          onPress={() => {
            if (mode === 'chat') {
              navigation.navigate(SCREEN_NAMES.CREATE_GROUP_CHAT);
            } else {
              navigation.navigate(SCREEN_NAMES.CREATE_GROUP_CHAT);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
