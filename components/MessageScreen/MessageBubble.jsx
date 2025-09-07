/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { View, Text } from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  Day,
} from "react-native-gifted-chat";
import { COLORS, FONT_WEIGHT } from "../../styles";

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{
      left: { alignItems: "center", justifyContent: "center" },
      right: {},
    }}
    imageStyle={{ left: {}, right: {} }}
  />
);

export const renderBubble = (props) => (
  <Bubble
    {...props}
    containerStyle={{
      left: {},
      right: {},
    }}
    wrapperStyle={{
      left: { backgroundColor: COLORS.grey },
      right: {},
    }}
    bottomContainerStyle={{
      left: {},
      right: {},
    }}
    usernameStyle={{ color: "tomato", fontWeight: "100" }}
    containerToNextStyle={{
      left: { borderColor: "red", borderWidth: 4 },
      right: {},
    }}
    containerToPreviousStyle={{
      left: { borderColor: "black", borderWidth: 4 },
      right: {},
    }}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: "pink" }}
    wrapperStyle={{ borderWidth: 10, borderColor: "white" }}
    textStyle={{ color: "red", fontWeight: FONT_WEIGHT.medium }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    containerStyle={{
      left: {},
      right: {},
    }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { padding: 4, borderRadius: 10 },
      right: { backgroundColor: COLORS.black, padding: 4, borderRadius: 10 },
    }}
    textStyle={{
      left: { color: COLORS.black },
      right: { color: COLORS.white },
    }}
    customTextStyle={{ fontSize: 14, lineHeight: 18 }}
  />
);

export const renderTime = (props) => null;

export const renderDay = (props) => (
  <Day
    {...props}
    textStyle={{ color: COLORS.white, fontWeight: FONT_WEIGHT.medium }}
  />
);

export const renderCustomView = ({ currentMessage, user }) => {
  if (currentMessage.user._id === user._id) {
    return null;
  }

  return (
    <View style={{ minHeight: 20, alignItems: "center" }}>
      <Text>
        Current user:
        {currentMessage.user.name}
      </Text>
    </View>
  );
};
