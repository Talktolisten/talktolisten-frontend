import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../util/constants';
import styles from './styles'; 

const Chat = ({ chat }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.element}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ChatStack", {
        screen: SCREEN_NAMES.MESSAGE,
        params: { bot_id: chat.bot_id1, chat_id: chat.chat_id }
      })}
    >
      <View style={styles.imageArea}>
        <Image source={{ uri: chat.bot_id1_profile_picture }} resizeMode="cover" style={styles.botImage}/>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.infoTitle}>{chat.bot_id1_name}</Text>
        <Text style={styles.infoSub}>{chat.last_message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
