import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../util/constants";
import styles from "./styles";

const GroupChat = ({ groupchat }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.element}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(SCREEN_NAMES.CHAT_TAB, {
          screen: SCREEN_NAMES.MESSAGE_GROUP,
          params: {
            group_bots: groupchat.group_bots,
            group_chat_id: groupchat.group_chat_id,
          },
        })
      }
    >
      <View style={styles.imageArea}>
        <Image
          source={{ uri: groupchat.group_chat_profile_picture }}
          resizeMode="cover"
          style={styles.botImage}
        />
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.infoTitle}>{groupchat.group_chat_name}</Text>
        <Text style={styles.infoSub} numberOfLines={1}>
          {groupchat.last_message_content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GroupChat;
