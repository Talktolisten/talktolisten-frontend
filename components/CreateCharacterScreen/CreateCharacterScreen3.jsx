import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { TextInput, RadioButton } from 'react-native-paper';
import { SCREEN_NAMES } from "../../util/constants";
import { generate_avatar } from "../../axios/bots";

const CreateCharacter3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, description, greeting, short_description, gender, privacy, imagePrompt_ai } = route.params;

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [imageIndexSelected, setImageIndexSelected] = useState(0);

  const [imagePrompt, setImagePrompt] = useState(imagePrompt_ai || "");

  const botDefaultAvatar = "https://ttl.blob.core.windows.net/default-avatar/botdefault.webp";

  const [images, setImages] = useState([botDefaultAvatar]);

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

  const handleOptionSelect = (option, name) => {
    setSelectedOptions(prevOptions => {
      const categoryOptions = prevOptions[name] || {};

      const isOptionSelected = categoryOptions[option];
      const newOptions = {
        ...prevOptions,
        [name]: {
          ...categoryOptions,
          [option]: !isOptionSelected,
        },
      };

      if (isOptionSelected) {
        delete newOptions[name][option];
        if (Object.keys(newOptions[name]).length === 0) {
          delete newOptions[name];
        }
      }

      return newOptions;
    });
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const generate_ai_image = async () => {
    setLoading(true);
    let addOnsArray = [];
    for (let key in selectedOptions) {
      const values = Object.keys(selectedOptions[key]);
      const addOns = key.toString() + " : " + values.join(" ") + ".";
      addOnsArray.push(addOns);
    }
    const ImagePrompt = imagePrompt + ". " + addOnsArray.join(" ");
    try {
      const ai_img_url = await generate_avatar(ImagePrompt);
      if (ai_img_url === null) {
        Alert.alert("The image prompt might contain harmful or inappropriate content, such as sexual content, hate speech, self-harm, and violence. Proceed with caution.");
        setLoading(false);
        return;
      }
      let newImages = [...images, ai_img_url];
      setImages(newImages);
      setImageIndexSelected(newImages.length - 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleImageArrow = (direction) => {
    if (direction === 'left' && imageIndexSelected - 1 >= 0) {
      setImageIndexSelected(imageIndexSelected - 1);
    } else if (direction === 'right' && imageIndexSelected + 1 < images.length) {
      setImageIndexSelected(imageIndexSelected + 1);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      let newImages = [...images, result.assets[0].uri];
      setImages(newImages);
      setImageIndexSelected(newImages.length - 1);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: "20%" }}>
          <View style={styles.controlImageContainer}>
            <TouchableOpacity onPress={() => handleImageArrow("left")} style={styles.arrowButton}>
              <AntDesign name="left" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.imageContainer}>

              <Image
                key={images[imageIndexSelected]}
                source={
                  typeof images[imageIndexSelected] === 'string'
                    ? { uri: images[imageIndexSelected] }
                    : images[imageIndexSelected]
                }
                style={styles.image}
              />

            </View>
            <TouchableOpacity onPress={() => handleImageArrow("right")} style={styles.arrowButton}>
              <AntDesign name="right" size={28} color="black" />
            </TouchableOpacity>
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
                animationInTiming={250}
                animationOutTiming={500}
                backdropColor={COLORS.light_black}
                backdropOpacity={0.85}
                onBackdropPress={toggleModal}
                swipeDirection={["down"]}
                onSwipeComplete={toggleModal}
                style={modalStyles.modalContainerScreen}
                key={selectedAddOn ? selectedAddOn.id : 'modal'}
              >
                <View style={modalStyles.modalContainer}>
                  <Text style={modalStyles.modalHeading}>{selectedAddOn?.name}</Text>
                  <View style={modalStyles.modalContent}>
                    {selectedAddOn && selectedAddOn.options && selectedAddOn.options.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          modalStyles.optionButton,
                          selectedOptions[selectedAddOn.name] && selectedOptions[selectedAddOn.name][option] ? modalStyles.selectedOption : {}
                        ]}
                        onPress={() => handleOptionSelect(option, selectedAddOn.name)}
                      >
                        <Text style={modalStyles.optionButtonText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>

              <View style={styles.addOnContainer}>
                {addOnStyles.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.addOnButton}
                    onPress={() => {
                      handleAddOnPress(item);
                    }}
                  >
                    <Text style={styles.addOnButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

        </ScrollView>
        {loading ? (
          <ActivityIndicator
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: 20,
            }}
            size="large"
            color={"rgba(237, 196, 132, 255)"}
          />
        ) : (
          <View style={[styles.buttonContainer, imageMode === 'ai-generated' ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }]}>
            {imageMode === 'ai-generated' && (
              <TouchableOpacity
                onPress={generate_ai_image}
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
                  fontWeight: FONT_WEIGHT.bold,
                  fontSize: FONTSIZE.xSmall,
                }}>Generate</Text>
              </TouchableOpacity>)}

            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_NAMES.CREATE_CHARACTER_4, {
                name,
                description,
                greeting,
                short_description,
                gender,
                privacy,
                profile_picture: images[imageIndexSelected],
              })}
              style={[styles.button, { backgroundColor: COLORS.blue }]}
            >
              <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.bold }]}>Next</Text>
            </TouchableOpacity>

          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
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
  controlImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  arrowButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.white,
    fontSize: FONTSIZE.xSmall,
  },
  radioButtonContainer: {
    marginVertical: SIZES.xLarge,
    width: "100%",
  },
  radioButton: {
    flex: 1,
    borderColor: COLORS.blue,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
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
    textAlign: 'center',
  },
  input: {
    height: 50,
    lineHeight: 20,
    borderRadius: 4,
    fontSize: FONTSIZE.xSmall,
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    fontSize: SIZES.xSmall,
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
    height: "auto",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  modalHeading: {
    fontSize: FONTSIZE.large,
    marginBottom: 20,
  },
  modalContent: {
    flexDirection: "row",
    flexWrap: "wrap",
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
