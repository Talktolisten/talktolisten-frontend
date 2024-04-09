import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from 'expo-linear-gradient';
import { SCREEN_NAMES } from "../../util/constants";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { get_all_voices } from "../../axios/voice";
import { create_new_bot } from "../../axios/bots";

const CreateCharacter4 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, description, greeting, short_description, gender, privacy, profile_picture } = route.params;

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);
  const [sound, setSound] = useState(new Audio.Sound());

  const userId = useSelector((state) => state.user.userID);
  const createCharacter = async (
    name,
    short_description,
    description,
    greeting,
    profile_picture,
    category,
    voice_id,
    privacy,
    gender,
    userId
  ) => {
    if (!profile_picture.startsWith("http")) {
      profile_picture = await FileSystem.readAsStringAsync(profile_picture, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
    create_new_bot(
      name,
      short_description,
      description,
      greeting,
      profile_picture,
      category,
      voice_id,
      privacy,
      gender,
      userId
    )
      .then((response) => {
        console.log(response);
        navigation.navigate(SCREEN_NAMES.CREATE_CHARACTER_5, { bot_id: response.bot_id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const voiceData = voices.map((voice) => {
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
      <Text style={styles.heading}>Character's voice</Text>
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
          onPress={async () => {
            await createCharacter(
              name,
              short_description,
              description,
              greeting,
              profile_picture,
              "",
              selectedVoice?.id,
              privacy,
              gender,
              userId
            );
          }}
          style={[styles.button, { backgroundColor: COLORS.blue, width: "100%" }]}
        >
          <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.medium }]}>Create Character</Text>
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
  heading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xxLarge,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
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
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONTSIZE.medium,
  },
  listContainer: {
    flex: 1,
    marginBottom: 100,
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
});

export default CreateCharacter4;
