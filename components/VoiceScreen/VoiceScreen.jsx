import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Button } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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

  const [buttonRecording, setButtonRecording] = useState("Start");
  const {botInfo, chat_id} = route.params;

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recording, setRecording] = useState(null);

  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);

  useAnimation(isUserTalking || isBotTalking, scaleValue1, scaleValue2);


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
      // setIsUserTalking(true);
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  const playBase64Audio = async (base64String) => {
    // Define the file URI where the audio will be written
    const fileUri = `${FileSystem.cacheDirectory}audio.mp3`;
  
    try {
      // Write the Base64 string to a file
      await FileSystem.writeAsStringAsync(fileUri, base64String, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Load the audio file into the player
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
  
      // Play the audio file
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing Base64 audio:', error);
    }
  };


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
    // setIsUserTalking(false);
    setIsBotTalking(true);
    const base64Audio = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
    try {
      const response = await voice_talk(chat_id, botInfo.bot_id, base64Audio);
      await playBase64Audio(response.response);
      setIsBotTalking(false);
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  }

  const handleButtonPress = () => {
    if (buttonRecording === "Start") {
      setButtonRecording("Stop");
      startRecording();
    } else {
      setButtonRecording("Start");
      stopRecording();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 40}}>{botInfo.bot_name}</Text>
      <Text style={{fontSize: 14, paddingHorizontal: 20, marginTop: 15}}>
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
        <Image source={{uri: botInfo.profile_picture }} style={styles.imageItem} />
      </View>
      <TouchableOpacity style={styles.buttonRecordingContainer} onPress={handleButtonPress}>
        {buttonRecording === 'Start' ? (
          <Image source={voiceEnd} style={styles.image} />
        ) : (
          <Image source={voiceStart} style={styles.image} />
        )}
        <Text style={styles.buttonRecording}>
          {buttonRecording === 'Start' ? 'Stopped' : 'Listening...'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(SCREEN_NAMES.CHAT)}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  imageItem: {
    width: 300,
    height: 300,
    borderRadius: 150,
    position: 'absolute',
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
    marginBottom: 40,
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
  button: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
  }
});

export default Voice;