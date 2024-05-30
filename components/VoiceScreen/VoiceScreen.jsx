import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, StatusBar, Platform } from "react-native";
import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { useAnimation } from "./hook";
import { voice_talk } from "./VoiceTalk";
import voiceStart from "../../assets/voiceStart.png";
import voiceEnd from "../../assets/voiceEnd.png";
import * as FileSystem from "expo-file-system";
import { get_user_info } from "../../axios/user";
import { Buffer } from "buffer";
import LiveAudioStream from "./setup/dataStreaming";
import { createDeepgramConnection } from "./setup/deepgram";
import { LiveTranscriptionEvents, LiveTranscriptionEvent, LiveClient, createClient } from "@deepgram/sdk";


const Voice = () => {
  const scaleValue1 = useRef(new Animated.Value(0)).current;
  const scaleValue2 = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();

  const { botInfo, chat_id } = route.params;
  const userId = useSelector((state) => state.user.userID);
  const [userInfo, setUserInfo] = useState({});

  const [buttonRecording, setButtonRecording] = useState("Stop");
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState(null);

  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);
  const [caption, setCaption] = useState('Let\'s talk!');
  const [userText, setUserText] = useState('');

  const [sound, setSound] = useState(null);

  const processingRef = useRef(false);

  const [connection, setConnection] = useState(LiveClient | null);
  const [connectionReady, setConnectionReady] = useState(false);

  useAnimation(isBotTalking, scaleValue1, scaleValue2);

  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await get_user_info(userId);
      setUserInfo(fetchedUserInfo);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };


  useEffect(() => {
    fetchUserInfo();

    const requestMicrophonePermission = async () => {
      try {
        if (permissionResponse && permissionResponse.status !== 'granted') {
          console.log('Requesting permission..');
          await requestPermission();
        }
        // Set audio mode to allow recording and playing in silent mode
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: 1,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: 1,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
      }
      catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    requestMicrophonePermission();
  }, [permissionResponse]);

  useLayoutEffect(() => {
    if (botInfo && botInfo.bot_name) {
      navigation.setOptions({
        headerTitle: botInfo.bot_name,
        tabBarVisible: false,
      });
    }
  }, [botInfo, navigation]);

  useFocusEffect(
    useCallback(() => {
      return async () => {
        if (sound?._loaded) {
          await sound.stopAsync();
        }
      };
    }, [sound])
  );

  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (isUserTalking) {
      if (userText.length > 0) {
        setCaption(userText);
      } else {
        setCaption("Listening..");
      }
    } else if (isBotTalking) {
      setTimeout(() => {
        setCaption("");
      }, 3000);
    }
  }, [isUserTalking, isBotTalking, userText]);

  useEffect(() => {
    const inConversation = async () => {
      if (buttonRecording === "Start" && connection && connectionReady) {
        if (!isBotTalking && !recording) {
          try {
            await startRecording();
          } catch (error) {
            console.error('Error starting recording:', error);
          }
        }
      }
    };
    inConversation();
  }, [connection, connectionReady, buttonRecording]);

  const processText = async (text) => {
    if (text && text.length > 0 && !processingRef.current) {
      console.log("Processing text..");
      processingRef.current = true;
      const audio = await voice_talk(chat_id, botInfo.bot_id, text);
      setUserText('');
      await playAudio(audio);
    }
  };


  const startConnection = async () => {
    const connection = createDeepgramConnection();

    connection.on(LiveTranscriptionEvents.Open, async () => {
      connection.getReadyState() ? console.log("Connection opened") : console.error("Connection failed to open");
      setConnectionReady(true);
      LiveAudioStream.on('data', (data) => {
        if (connection && connection.getReadyState() === 1) {
          var chunk = Buffer.from(data, 'base64');
          connection.send(chunk);
        }
      });
    });

    connection.on(LiveTranscriptionEvents.Close, (event) => {
      console.log("Connection closed", event);
    });

    connection.on(LiveTranscriptionEvents.Transcript, async (results) => {
      const text = results.channel.alternatives[0].transcript;
      console.log(processingRef.current, text);
      if (text.length > 0 && results.is_final && !processingRef.current) {
        console.log("Received final transcription results", text);
        setIsUserTalking(true);
        setUserText(text);
        LiveAudioStream.stop();
        setIsBotTalking(true);
        setIsUserTalking(false);
        processText(text);
        LiveAudioStream.start();
      }
      // console.log("Received transcription results", results);
    });

    connection.on(LiveTranscriptionEvents.Metadata, (metadata) => {
      // console.log("Received metadata", metadata);
    });

    connection.on(LiveTranscriptionEvents.Error, (error) => {
      console.error("An error occurred", error);
    });

    connection.on(LiveTranscriptionEvents.Warning, (warning) => {
      console.warn("Received a warning", warning);
    });

    return connection;
  };

  const playAudio = async (audioURL) => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync({ uri: audioURL });
      setSound(soundObject);
      console.log('Playing audio..');
      await soundObject.setVolumeAsync(1.0);
      await soundObject.playAsync();

      soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
        if (playbackStatus.didJustFinish) {
          setIsBotTalking(false);
          setIsUserTalking(true);
          setTimeout(() => {
            processingRef.current = false;
          }, 3000);
        }
      });

    } catch (error) {
      console.error('Error playing Base64 audio:', error);
    }
  };

  async function startRecording() {
    try {
      console.log('Starting recording..');

      const newRecording = new Audio.Recording();
      setRecording(newRecording);

      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      LiveAudioStream.start();

    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    try {
      LiveAudioStream.stop();
      await recording.stopAndUnloadAsync();
      setRecording(null);
    } catch (error) {
      console.error('Error stopping recording:', error);
      throw error;
    }
  }


  const handleButtonPress = async () => {
    if (buttonRecording === "Start") {
      setButtonRecording("Stop");
      await stopRecording();
      setIsBotTalking(false);
      setIsUserTalking(false);
      setCaption('Let\'s talk!')
      if (connection) {
        connection.finish();
        setConnection(null);
      } else {
        console.error('Error: No active connection to finish');
      }
    } else {
      setButtonRecording("Start");
      const connection = await startConnection();
      setConnection(connection);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: FONTSIZE.medium, paddingHorizontal: 20, marginTop: 15, marginBottom: 70 }}>
        {botInfo.short_description}
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
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>{caption}</Text>
      </View>
      <TouchableOpacity style={styles.buttonRecordingContainer} onPress={handleButtonPress}>
        {buttonRecording === 'Start' ? (
          <Image source={voiceStart} style={styles.image} />
        ) : (
          <Image source={voiceEnd} style={styles.image} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight + SIZES.xLarge + 20 : null,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  imageArea: {
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
    marginBottom: 30,
  },
  buttonRecording: {
    color: COLORS.black,
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  captionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  caption: {
    fontSize: FONTSIZE.small,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.light_black,
  },
});

export default Voice;