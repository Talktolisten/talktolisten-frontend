import React, { useState } from "react";
import "./styles";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../util/constants";

const Chat = ({ bot }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.element}
      key={bot.bot_id}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ChatStack", { screen: "Message", params: { bot } })
      }
    >
      <View style={styles.imageArea}>
        <Image
          source={{ uri: bot.profile_picture }}
          resizeMode="cover"
          style={styles.botImage}
        />
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.infoTitle}>{bot.bot_name}</Text>
        <Text style={styles.infoSub}>{bot.short_description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
