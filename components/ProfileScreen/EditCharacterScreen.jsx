import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { COLORS, FONTSIZE, SIZES, FONT_WEIGHT } from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { get_bot_info_toEdit, update_bot } from "../../axios/bots.jsx";
import { get_voice } from "../../axios/voice.jsx";
import { SCREEN_NAMES } from "../../util/constants.js";

const EditCharacter = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const route = useRoute();
  const { botId } = route.params;

  const fetchBotInfo = async () => {
    try {
      const fetchedBotInfo = await get_bot_info_toEdit(botId);
      setSelectedImage(fetchedBotInfo.profile_picture);
      setName(fetchedBotInfo.bot_name);
      setShortDescription(fetchedBotInfo.short_description);
      setDescription(fetchedBotInfo.description);
      setGreeting(fetchedBotInfo.greeting);
      setPrivacy(fetchedBotInfo.privacy);
      fetchVoiceInfo(fetchedBotInfo.voice_id);
    } catch (error) {
      console.error("Failed to fetch bot info:", error);
    }
  };

  const fetchVoiceInfo = async (voice_id) => {
    try {
      const voiceInfo = await get_voice(voice_id);
      setVoice(voiceInfo);
    } catch (error) {
      console.error("Failed to fetch voice info:", error);
    }
  };

  useEffect(() => {
    fetchBotInfo();
  }, [refresh]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [description, setDescription] = useState(null);
  const [greeting, setGreeting] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [voice, setVoice] = useState(null);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setIsAvatarChanged(true);
      setIsChanged(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
              marginVertical: 22,
            }}
          >
            <TouchableOpacity onPress={handleImageSelection}>
              <Image
                source={{ uri: selectedImage }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: COLORS.black,
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={32}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoChildContainer}>
              <Text style={styles.heading}>Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={name}
                  onChangeText={(value) => {
                    setName(value);
                    setIsChanged(true);
                  }}
                  editable={true}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.infoChildContainer}>
              <Text style={styles.heading}>Character Definition</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={description}
                  onChangeText={(value) => {
                    setDescription(value);
                    setIsChanged(true);
                  }}
                  editable={true}
                  style={[styles.input, { minHeight: 70 }]}
                  multiline={true}
                />
              </View>
            </View>

            <View style={styles.infoChildContainer}>
              <Text style={styles.heading}>Greeting</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={greeting}
                  onChangeText={(value) => {
                    setGreeting(value);
                    setIsChanged(true);
                  }}
                  editable={true}
                  style={styles.input}
                  multiline
                />
              </View>
            </View>

            <View style={styles.infoChildContainer}>
              <Text style={styles.heading}>Short Description</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={shortDescription}
                  onChangeText={(value) => {
                    setShortDescription(value);
                    setIsChanged(true);
                  }}
                  editable={true}
                  style={styles.input}
                  multiline
                />
              </View>
            </View>

            <View style={styles.infoChildContainer}>
              <Text style={styles.heading}>Voice</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>
                  {voice ? voice.voice_name : "Select Voice"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  paddingVertical: 10,
                  backgroundColor: COLORS.black,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate(SCREEN_NAMES.SELECT_VOICE, {
                    onGoBack: (voiceObject) => {
                      if (voiceObject !== null) {
                        setVoice(voiceObject);
                        setIsChanged(true);
                      }
                    },
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: FONTSIZE.xSmall,
                    color: COLORS.white,
                    fontWeight: FONT_WEIGHT.medium,
                  }}
                >
                  Select Voice
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoChildContainer}>
              <Text style={styles.heading}>Privacy</Text>
              <RadioButton.Group
                onValueChange={(value) => {
                  setPrivacy(value);
                  setIsChanged(true);
                }}
                value={privacy}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      privacy === "public" ? styles.radioButtonSelected : {},
                    ]}
                    onPress={() => {
                      setPrivacy("public");
                      setIsChanged(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.radioButtonLabel,
                        privacy === "public"
                          ? styles.radioButtonLabelSelected
                          : {},
                      ]}
                    >
                      Public
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      privacy === "private" ? styles.radioButtonSelected : {},
                    ]}
                    onPress={() => {
                      setPrivacy("private");
                      setIsChanged(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.radioButtonLabel,
                        privacy === "private"
                          ? styles.radioButtonLabelSelected
                          : {},
                      ]}
                    >
                      Private
                    </Text>
                  </TouchableOpacity>
                </View>
              </RadioButton.Group>
              <Text style={styles.privacyDescription}>
                {privacy === "public"
                  ? "Other people can talk to your character"
                  : "Only you can talk to the character"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={
              isChanged
                ? styles.buttonContainer
                : [
                    styles.buttonContainer,
                    { backgroundColor: COLORS.light_black },
                  ]
            }
            onPress={
              isChanged
                ? async () => {
                    try {
                      let profile_picture = null;
                      if (isAvatarChanged) {
                        profile_picture = await FileSystem.readAsStringAsync(
                          selectedImage,
                          {
                            encoding: FileSystem.EncodingType.Base64,
                          },
                        );
                      }
                      await update_bot(
                        botId,
                        name,
                        shortDescription,
                        description,
                        profile_picture,
                        null,
                        greeting,
                        privacy,
                        null,
                      );
                      setIsChanged(false);
                      setIsAvatarChanged(false);
                      setRefresh(!refresh);
                    } catch (error) {
                      console.error("Failed to update user info:", error);
                    }
                  }
                : null
            }
          >
            <Text style={styles.buttonText}>Save Change</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditCharacter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SIZES.xLarge,
  },
  infoContainer: {
    marginBottom: SIZES.xLarge,
    marginHorizontal: SIZES.xSmall,
    flexDirection: "column",
    justifyContent: "center",
  },
  infoChildContainer: {
    marginVertical: 10,
  },
  heading: {
    fontSize: FONTSIZE.small,
  },
  input: {
    borderRadius: 5,
  },
  inputContainer: {
    borderColor: COLORS.light_black,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: "20%",
  },
  buttonText: {
    fontSize: FONTSIZE.small,
    color: COLORS.white,
  },
  radioButton: {
    flex: 1,
    borderColor: COLORS.blue,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    marginVertical: 5,
    marginTop: 10,
  },
  radioButtonSelected: {
    backgroundColor: COLORS.blue,
  },
  radioButtonLabelSelected: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.medium,
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.xSmall,
    textAlign: "center",
  },
  privacyDescription: {
    textAlign: "center",
    fontSize: FONTSIZE.xSmall,
    marginTop: SIZES.small,
  },
});
