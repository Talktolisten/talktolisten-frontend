// Chat.js
import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../util/constants';
import styles from './styles'; // Adjust the import path as necessary

const Chat = ({ chat }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.element}
      activeOpacity={0.8}
      onPress={() => navigation.navigate(SCREEN_NAMES.CHAT_STACK, {
        screen: SCREEN_NAMES.MESSAGE,
        params: { chat_id: chat.chat_id, chat_id: chat.chat_id }
      })}
    >
      <View style={styles.imageArea}>
        <Image source={{ uri: chat.profile_picture }} resizeMode="cover" style={styles.chatImage} />
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.infoTitle}>{chat.chat_name}</Text>
        <Text style={styles.infoSub}>{chat.short_description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
