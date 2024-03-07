import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, StatusBar } from "react-native";
import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { useAnimation } from "./hook";
import { voice_talk } from "./VoiceTalk";
import voiceStart from "../../assets/voiceStart.png";
import voiceEnd from "../../assets/voiceEnd.png";
import * as FileSystem from "expo-file-system";
const Voice = () => {
  const scaleValue1 = useRef(new Animated.Value(0)).current;
  const scaleValue2 = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();

  const { botInfo, chat_id } = route.params;
  const [buttonRecording, setButtonRecording] = useState("Stop");

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState(null);

  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);
  const [sound, setSound] = useState(null);

  useAnimation(isBotTalking, scaleValue1, scaleValue2);

  useLayoutEffect(() => {
    if (botInfo && botInfo.bot_name) {
      navigation.setOptions({
        headerTitle: botInfo.bot_name
      });
    }
  }, [botInfo, navigation]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        sound?.stopAsync();
      };
    }, [sound])
  );


  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); // Stops and unloads the audio
      }
      : undefined;
  }, [sound]);


  const playBase64Audio = async (base64String) => {
    const fileUri = `${FileSystem.cacheDirectory}audio.mp3`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { sound: soundObject } = await Audio.Sound.createAsync({ uri: fileUri });
      setSound(soundObject);

      await soundObject.playAsync();

      soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
        if (playbackStatus.didJustFinish) {
          setIsBotTalking(false);
        }
      });

    } catch (error) {
      console.error('Error playing Base64 audio:', error);
    }
  };

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    const base64Audio = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
    try {
      const response = await voice_talk(chat_id, botInfo.bot_id, base64Audio);
      if (response.is_response) {
        playBase64Audio(response.response);
        setIsBotTalking(true);
        setIsUserTalking(false);
      } else {
        if (response.user_speaking) {
          setIsUserTalking(true);
        } else {
          setIsUserTalking(false);
        }
      }
    } catch (error) {
      console.error('Error sending audio:', error);
      throw error;
    }
  }

  const handleButtonPress = () => {
    if (buttonRecording === "Start") {
      setButtonRecording("Stop");
      stopRecording();
    } else {
      setButtonRecording("Start");
      startRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 14, paddingHorizontal: 20, marginTop: 15 }}>
        {botInfo.description}
      </Text>
      <View style={styles.imageArea}>
        <Animated.View
          style={[
            styles.circle,
            {
              width: 340,
              height: 340,
              borderRadius: 170,
              transform: [{ scale: scaleValue1 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {
              width: 320,
              height: 320,
              borderRadius: 160,
              transform: [{ scale: scaleValue2 }],
            },
          ]}
        />
        <Image source={{ uri: botInfo.profile_picture }} style={styles.imageItem} />
      </View>
      <TouchableOpacity style={styles.buttonRecordingContainer} onPress={handleButtonPress}>
        {buttonRecording === 'Start' ? (
          <Image source={voiceStart} style={styles.image} />
        ) : (
          <Image source={voiceEnd} style={styles.image} />
        )}
        <Text style={styles.buttonRecording}>
          {buttonRecording === 'Start' ? 'Listening... Tap to Stop' : ''}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight + SIZES.xLarge + 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  imageArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageItem: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  circle: {
    borderColor: 'blue',
    borderWidth: 5,
    position: 'absolute',
  },
  buttonRecordingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  buttonRecording: {
    color: COLORS.black,
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
    marginTop: 10
  },
  image: {
    width: 70,
    height: 70,
  }
});

export default Voice;