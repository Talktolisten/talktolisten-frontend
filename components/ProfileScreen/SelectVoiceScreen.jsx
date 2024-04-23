import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import * as FileSystem from "expo-file-system";
import { SCREEN_NAMES } from "../../util/constants";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { get_all_voices } from "../../axios/voice";

const SelectVoice = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);
  const [sound, setSound] = useState(new Audio.Sound());
  const [genderMode, setGenderMode] = useState('male');

  useEffect(() => {
    const setAudioMode = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: 1,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 1,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
    };

    setAudioMode();
  }, []);

  useEffect(() => {
    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        setIsSamplePlaying(false);
      }
    });

    return () => {
      sound.setOnPlaybackStatusUpdate(null);
    };
  }, [isSamplePlaying]);

  const playSample = async (sample_url) => {
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && isSamplePlaying) {
        await sound.stopAsync();
      }
      await sound.unloadAsync();
      await sound.loadAsync({ uri: sample_url });
      await sound.playAsync();
      setIsSamplePlaying(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getVoices = async () => {
    try {
      const response = await get_all_voices();
      setVoices(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVoices();
  }, []);

  const voiceData = voices
    .filter(voice => voice.gender === genderMode)
    .map((voice) => {
      return {
        id: voice.voice_id,
        title: voice.voice_name,
        description: voice.voice_description,
        sample_url: voice.sample_url,
      }
    });

  const Item = ({ id, title, description, sample_url }) => {
    const isSelected = selectedVoice?.id === id;
    const isPlaying = isSamplePlaying && isSelected;

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && selectedVoice !== null ? styles.selectedItem : {}
        ]}
        onPress={() => {
          setSelectedVoice({ id: id, title, description });
          if (!isPlaying) {
            playSample(sample_url);
          }
        }}
      >
        {isPlaying ? (
          <MaterialCommunityIcons name="stop-circle" size={24} color={COLORS.blue} />
        ) : (
          <MaterialIcons name="play-circle-filled" size={24} color={COLORS.black} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <Item id={item.id} title={item.title} description={item.description} sample_url={item.sample_url} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.radioButtonContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity style={[styles.radioButton, genderMode === 'male' ? styles.radioButtonSelected : {}]} onPress={() => setGenderMode('male')}>
            <Text style={[styles.radioButtonLabel, genderMode === 'male' ? styles.radioButtonLabelSelected : {}]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.radioButton, genderMode === 'female' ? styles.radioButtonSelected : {}]} onPress={() => setGenderMode('female')}>
            <Text style={[styles.radioButtonLabel, genderMode === 'female' ? styles.radioButtonLabelSelected : {}]}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={voiceData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedVoice}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[styles.button, { borderWidth: 1 }]}
        >
          <Text style={[styles.buttonText, { color: COLORS.black, fontWeight: FONT_WEIGHT.regular }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const voiceObject = {
              voice_name: selectedVoice.title,
              voice_description: selectedVoice.description,
              voice_id: selectedVoice.id,
            }
            if (route.params?.onGoBack) {
              route.params.onGoBack(voiceObject);
            }
            navigation.goBack();
          }}
          style={[styles.button, { backgroundColor: COLORS.blue }]}
        >
          <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.medium }]}>Select</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  topheadingContainer: {
    marginBottom: SIZES.xSmall,
    alignSelf: "center",
  },
  topheading: {
    fontSize: FONTSIZE.large,
    marginBottom: 10,
  },
  subheadingContainer: {
    alignSelf: "center",
    paddingHorizontal: SIZES.small,
    marginHorizontal: SIZES.xSmall,
    marginBottom: SIZES.medium,
    width: "100%",
  },
  subheading: {
    fontSize: FONTSIZE.small,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: "5%",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.small,
    fontSize: FONTSIZE.small,
  },
  listContainer: {
    flex: 1,
    marginBottom: "20%",
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 5,
  },
  playButton: {
    marginRight: 10,
  },
  textContainer: {
    marginHorizontal: SIZES.small,
  },
  title: {
    fontSize: FONTSIZE.small,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: 5,
  },
  description: {
    fontSize: FONTSIZE.xSmall,
    color: COLORS.light_black,
  },
  selectedItem: {
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  radioButton: {
    padding: 10,
    width: "47.5%",
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: COLORS.bright_grey,
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.small,
    color: COLORS.light_black,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.medium,
  },
  radioButtonLabelSelected: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default SelectVoice;
