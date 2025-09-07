import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { send_feedback_report } from "../../axios/user";

const Report = () => {
  const [feedback, setFeedback] = useState("");
  const [images, setImages] = useState([null]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      let newImages = [...images];
      newImages[index] = result.assets[0].uri;
      if (index === images.length - 1) {
        newImages.push(null);
      }
      setImages(newImages);
    }
  };

  const handleSubmit = async () => {
    if (feedback.length === 0) {
      alert("Please enter a your report.");
      return;
    } else {
      console.log(feedback);
      console.log(images);
      let image_list = [];
      if (images) {
        for (let i = 0; i < images.length - 1; i++) {
          let newDecodedImage = await FileSystem.readAsStringAsync(images[i], {
            encoding: FileSystem.EncodingType.Base64,
          });
          image_list.push(newDecodedImage);
        }
      }
      send_feedback_report(
        null,
        feedback,
        image_list.length > 0 ? image_list : null,
      );
      setFeedback("");
      setImages([null]);
      setIsSubmitted(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          {isSubmitted ? (
            <Text style={styles.paragraph}>
              Thank you for reporting this issue. We will get back to you in 24
              hours
            </Text>
          ) : (
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View style={styles.infoContainer}>
                <Text style={styles.paragraph}>
                  Feel free to report any issues you find with our app. Help us
                  maintain a positive community!
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input]}
                  value={feedback}
                  onChangeText={setFeedback}
                  placeholder="Report an user, inappropriate behavior, or a bug..."
                  placeholderTextColor={COLORS.light_black}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <Text style={styles.subheading}>Upload images (Optional)</Text>

              <ScrollView
                horizontal
                contentContainerStyle={styles.imageContainer}
              >
                {images.map((image, index) => (
                  <View key={index} style={{ position: "relative" }}>
                    <TouchableOpacity onPress={() => pickImage(index)}>
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={{ width: 125, height: 125 }}
                        />
                      ) : (
                        <View
                          style={{
                            width: 125,
                            height: 125,
                            backgroundColor: COLORS.white,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                          }}
                        >
                          <Text style={{ fontSize: FONTSIZE.xLarge + 22 }}>
                            +
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                    {image && (
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          right: 5,
                          top: 5,
                          backgroundColor: COLORS.red,
                          width: 20,
                          height: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 20,
                        }}
                        onPress={() => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          X
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Report;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    padding: SIZES.medium,
  },
  subheading: {
    alignSelf: "flex-start",
    paddingLeft: SIZES.large + 25,
    fontSize: FONTSIZE.medium,
    marginTop: SIZES.xLarge,
    fontWeight: FONT_WEIGHT.medium,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: SIZES.xLarge,
  },
  paragraph: {
    fontSize: FONTSIZE.small,
    textAlign: "center",
    marginBottom: SIZES.small,
    paddingHorizontal: SIZES.xLarge,
    lineHeight: 22,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
    borderColor: COLORS.black,
    padding: SIZES.medium,
    marginHorizontal: SIZES.medium,
    borderWidth: 1.25,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    fontSize: FONTSIZE.small,
    height: 200,
    marginBottom: SIZES.large,
  },
  imageContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 20,
    marginTop: SIZES.large,
    marginHorizontal: SIZES.large,
  },
  buttonContainer: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.xSmall,
    padding: SIZES.xSmall,
    width: "65%",
  },
  button: {
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONTSIZE.medium,
  },
};
