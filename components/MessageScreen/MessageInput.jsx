import React from 'react';
import { Image, View } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import headset from '../../assets/headset.png';
import send from '../../assets/send.png';
import { COLORS } from '../../styles';
import { SCREEN_NAMES } from '../../util/constants';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: COLORS.white,
      paddingTop: 4,
      paddingBottom: 6,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);

export const renderActions = (props, botInfo, chat_id) => {
  const navigation = useNavigation();

  return (
    <Actions
      {...props}
      onPressActionButton={() => navigation.navigate(SCREEN_NAMES.VOICE, { botInfo, chat_id })}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32 }}
          source={headset}
        />
      )}
    />
  );
};

export const renderActions_GroupChat = (props, group_bots, group_chat_id, group_chat_info) => {
  const navigation = useNavigation();

  return (
    <Actions
      {...props}
      onPressActionButton={() => navigation.navigate(SCREEN_NAMES.VOICE_GROUP, { group_bots, group_chat_id, group_chat_info })}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32 }}
          source={headset}
        />
      )}
    />
  );
};

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: COLORS.black,
      fontSize: 14,
      backgroundColor: COLORS.grey,
      borderRadius: 20,
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = ({ isSending, ...props }) => {
  return (
    <Send
      {...props}
      disabled={isSending}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <Image
        style={{ width: 32, height: 32, opacity: isSending ? 0.25 : 1 }}
        source={send}
      />
    </Send>
  );
};