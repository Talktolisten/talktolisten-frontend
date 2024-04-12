import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { TextInput, RadioButton } from 'react-native-paper';
import { SCREEN_NAMES } from "../../util/constants";
import { generate_image_prompt } from "../../axios/bots";



const CreateCharacter2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { name, description, greeting_ai, short_description_ai } = route.params;

  const [greeting, setGreeting] = useState(greeting_ai)
  const [shortDescription, setShortDescription] = useState(short_description_ai);
  const [gender, setGender] = useState('male');
  const [privacy, setPrivacy] = useState('public');

  const generateImagePrompt = async () => {
    setLoading(true);
    try {
      const new_description = description + `\n(Gender: ${gender})`;
      const imagePrompt = await generate_image_prompt(name, new_description);
      navigation.navigate(SCREEN_NAMES.CREATE_CHARACTER_3, { name, description, greeting, short_description: shortDescription, gender, privacy, imagePrompt_ai: imagePrompt });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: "20%" }}>
          <View style={styles.inputContainer}>
            <View style={styles.topheadingContainer}>
              <Text style={styles.topheading}>Greeting</Text>
            </View>

            <View style={styles.subheadingContainer}>
              <Text style={styles.subheading}>Introduction of your character</Text>
              <TextInput
                placeholder="Greeting"
                style={[styles.input]}
                multiline
                mode="outlined"
                activeOutlineColor={COLORS.black}
                maxLength={200}
                value={greeting}
                onChangeText={(text) => setGreeting(text)}
              />
            </View>

          </View>

          <View style={styles.inputContainer}>
            <View style={styles.topheadingContainer}>
              <Text style={styles.topheading}>Character Short Description</Text>
            </View>

            <View style={styles.subheadingContainer}>
              <Text style={styles.subheading}>A short description for your character</Text>
              <TextInput
                placeholder="A short description of your character."
                style={[styles.input]}
                multiline
                mode="outlined"
                activeOutlineColor={COLORS.black}
                maxLength={300}
                value={shortDescription}
                onChangeText={(text) => setShortDescription(text)}
              />
            </View>

          </View>

          <View style={styles.radioButtonContainer}>
            <View style={styles.topheadingContainer}>
              <Text style={styles.topheading}>Gender</Text>
            </View>
            <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={[styles.radioButton, gender === 'male' ? styles.radioButtonSelected : {}]} onPress={() => setGender('male')}>
                  <Text style={[styles.radioButtonLabel, gender === 'male' ? styles.radioButtonLabelSelected : {}]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.radioButton, gender === 'female' ? styles.radioButtonSelected : {}]} onPress={() => setGender('female')}>
                  <Text style={[styles.radioButtonLabel, gender === 'female' ? styles.radioButtonLabelSelected : {}]}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.radioButton, gender === 'non-binary' ? styles.radioButtonSelected : {}]} onPress={() => setGender('non-binary')}>
                  <Text style={[styles.radioButtonLabel, gender === 'non-binary' ? styles.radioButtonLabelSelected : {}]}>Non-binary</Text>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.radioButtonContainer}>
            <View style={styles.topheadingContainer}>
              <Text style={styles.topheading}>Privacy</Text>
            </View>
            <RadioButton.Group onValueChange={value => setPrivacy(value)} value={privacy}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={[styles.radioButton, privacy === 'public' ? styles.radioButtonSelected : {}]} onPress={() => setPrivacy('public')}>
                  <Text style={[styles.radioButtonLabel, privacy === 'public' ? styles.radioButtonLabelSelected : {}]}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.radioButton, privacy === 'private' ? styles.radioButtonSelected : {}]} onPress={() => setPrivacy('private')}>
                  <Text style={[styles.radioButtonLabel, privacy === 'private' ? styles.radioButtonLabelSelected : {}]}>Private</Text>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
            <Text style={styles.privacyDescription}>
              {privacy === 'public' ? 'Other people can talk to your character' : 'Only you can talk to the character'}
            </Text>
          </View>

        </ScrollView>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.blue} />
          ) : (
            <TouchableOpacity
              onPress={generateImagePrompt}
              style={[styles.button, { backgroundColor: COLORS.blue }]}
            >
              <Text style={[styles.buttonText]}>Next</Text>
            </TouchableOpacity>
          )}
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
  topheadingContainer: {
    marginBottom: SIZES.medium,
  },
  topheading: {
    fontSize: FONTSIZE.small,
  },
  subheadingContainer: {
    alignSelf: "center",
    marginBottom: SIZES.small,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.bright_grey,
  },
  subheading: {
    fontSize: FONTSIZE.xSmall,
  },
  input: {
    paddingTop: 5,
    borderRadius: 5,
    fontSize: FONTSIZE.xSmall,
    backgroundColor: COLORS.white,
    marginTop: SIZES.xSmall,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 10,
  },
  inputContainer: {
    alignItems: "left",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
    width: "100%",
  },
  inputIcon: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
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
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.white,
    fontSize: FONTSIZE.xSmall,
  },
  radioButtonContainer: {
    marginBottom: SIZES.xLarge,
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
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.xSmall,
    textAlign: 'center',
  },
  privacyDescription: {
    textAlign: 'center',
    fontSize: FONTSIZE.xSmall,
    marginTop: SIZES.small,
  },
});

export default CreateCharacter2;
