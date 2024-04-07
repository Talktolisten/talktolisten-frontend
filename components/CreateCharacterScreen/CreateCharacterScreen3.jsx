import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { TextInput, RadioButton } from 'react-native-paper';
import botDefaultAvatar from "../../assets/bot_default_avatar.png";
import { SCREEN_NAMES } from "../../util/constants";

const CreateCharacter3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, description, greeting, short_description, gender, privacy, imagePrompt_ai } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [imagePrompt, setImagePrompt] = useState(imagePrompt_ai || "");

  const [image, setImage] = useState(botDefaultAvatar);
  const [imageMode, setImageMode] = useState('ai-generated' || 'upload');

  const addOnStyles = [
    {
      id: '0', name: 'Style', options: ['Anime', 'Realism', 'Cartoon', 'Fantasy',
        'Cyberpunk', 'Steampunk', 'Gothic', 'Retro',
        'Watercolor', 'Pixel Art', 'Chibi', 'Manga', 'Sketch',
        'Pop Art', 'Photorealism', 'Concept Art', 'Graffiti']
    },
    { id: '1', name: 'Accessories', options: ['Glasses', 'Hat', 'Jewelry', 'Scarf', 'Tie'] },
    { id: '2', name: 'Eyes Color', options: ['Blue', 'Brown', 'Black'] },
    { id: '3', name: 'Background', options: ['City', 'Nature', 'Abstract', 'Indoors', 'Space'] },
    { id: '5', name: 'Hair Style', options: ['Short', 'Long', 'Ponytail', 'Bun', 'Bald', 'Blonde', 'Brown', 'Black', 'Red', 'Grey', 'Pink'] },
    { id: '6', name: 'Outfit', options: ['Casual', 'Formal', 'Sporty', 'Fantasy', 'Traditional'] },
    { id: '7', name: 'Skin Tone', options: ['Fair', 'Medium', 'Olive', 'Tan', 'Dark'] },
    { id: '11', name: 'Body Shape', options: ['Slim', 'Athletic', 'Average', 'Curvy', 'Muscular'] },
  ];

  const handleAddOnPress = (addOn) => {
    setSelectedAddOn(addOn);
    setModalVisible(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const generate_ai_image = async () => {
  //   const ImagePrompt = imagePrompt + " " + Object.keys(selectedOptions).join(" ");
  //   try {
  //     const { image } = await generate_image(ImagePrompt);
  //     setImage(image);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Character's Avatar</Text>

        <View style={styles.imageContainer}>
          <Image
            key={image}
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
          />
        </View>

        <View style={styles.radioButtonContainer}>
          <RadioButton.Group onValueChange={value => setImageMode(value)} value={imageMode}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={[styles.radioButton, imageMode === 'upload' ? styles.radioButtonSelected : {}]} onPress={() => {
                setImageMode('upload');
                pickImage();
              }}>
                <Text style={[styles.radioButtonLabel, imageMode === 'upload' ? styles.radioButtonLabelSelected : {}]}>Upload your Avatar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, imageMode === 'ai-generated' ? styles.radioButtonSelected : {}]} onPress={() => setImageMode('ai-generated')}>
                <Text style={[styles.radioButtonLabel, imageMode === 'ai-generated' ? styles.radioButtonLabelSelected : {}]}>AI-generated image</Text>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>

        {imageMode === 'ai-generated' && (
          <View>
            <View style={styles.inputContainer}>

              <TextInput
                placeholder={imagePrompt}
                style={[styles.input, { height: 100 }]}
                mode="outlined"
                label={"Image Prompt"}
                activeOutlineColor={COLORS.black}
                contentStyle={{ paddingTop: SIZES.xLarge }}
                multiline
                maxLength={1000}
                value={imagePrompt}
                onChangeText={(text) => setImagePrompt(text)}
              />
            </View>

            <Modal
              isVisible={isModalVisible}
              animationInTiming={500}
              animationOutTiming={1000}
              backdropColor={COLORS.light_black}
              backdropOpacity={0.85}
              onBackdropPress={toggleModal}
              swipeDirection={["down"]}
              onSwipeComplete={toggleModal}
              style={modalStyles.modalContainerScreen}
            >
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.modalHeading}>{selectedAddOn?.name}</Text>
                {selectedAddOn && selectedAddOn.options && (
                  <FlatList
                    data={selectedAddOn.options}
                    numColumns={5}
                    keyExtractor={(item) => item}
                    renderItem={({ item: option }) => (
                      <TouchableOpacity
                        key={option}
                        style={[modalStyles.optionButton, selectedOptions[option] && modalStyles.selectedOption]}
                        onPress={() => handleOptionSelect(option)}
                      >
                        <Text style={modalStyles.optionButtonText}>{option}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </Modal>

            <View style={styles.addOnContainer}>
              <FlatList
                data={addOnStyles}
                numColumns={4}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.addOnButton}
                    onPress={() => {
                      handleAddOnPress(item);
                    }}
                  >
                    <Text style={styles.addOnButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            // onPress={}
            style={[styles.button, {
              width: "55%", overflow: "hidden", borderRadius: 5
            }]}
          >
            <LinearGradient
              colors={[
                'rgba(208, 179, 200, 255)',
                'rgba(237,196,132,255)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
            <Text style={{
              color: COLORS.black,
              fontWeight: FONT_WEIGHT.medium,
              fontSize: FONTSIZE.medium,
            }}>Generate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN_NAMES.CREATE_CHARACTER_4, {
              name,
              description,
              greeting,
              short_description,
              gender,
              privacy,
              profile_picture: ""
            })}
            style={[styles.button, { backgroundColor: COLORS.blue }]}
          >
            <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.bold }]}>Next</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  heading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xxLarge,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.black,
    marginBottom: SIZES.xSmall
  },
  topheadingContainer: {
    marginBottom: SIZES.xSmall,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  topheading: {
    fontSize: FONTSIZE.large,
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
  radioButtonContainer: {
    marginVertical: SIZES.xLarge,
    width: "100%",
  },
  radioButton: {
    flex: 1,
    borderColor: COLORS.black,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  radioButtonSelected: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.blue,
  },
  radioButtonLabelSelected: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.small,
    textAlign: 'center',
  },
  input: {
    height: 50,
    lineHeight: 20,
    borderRadius: 4,
    fontSize: FONTSIZE.small,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 10,
  },
  inputContainer: {
    alignItems: "left",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 150,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    alignSelf: 'center',
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: 'gray',
  },
  addOnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addOnButton: {
    margin: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    paddingHorizontal: 10,
  },
  addOnButtonText: {
    fontSize: SIZES.small,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
    textAlign: 'center',
  },
});

const modalStyles = StyleSheet.create({
  modalContainerScreen: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: "100%",
    margin: 5,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: "30%",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalHeading: {
    fontSize: FONTSIZE.large,
    marginBottom: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  optionButton: {
    padding: 10,
    margin: 5,
    backgroundColor: COLORS.grey,
    borderRadius: 20,
  },
  optionButtonText: {
    fontSize: FONTSIZE.small,
  },
  selectedOption: {
    borderColor: COLORS.black,
    borderWidth: 1,
  },
});

export default CreateCharacter3;
