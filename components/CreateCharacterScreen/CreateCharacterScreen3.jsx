import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { TextInput, RadioButton } from 'react-native-paper';


const CreateCharacter3 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, description, greeting_ai, short_description_ai } = route.params;

  const [greeting, setGreeting] = useState(greeting_ai)
  const [shortDescription, setShortDescription] = useState(short_description_ai);
  const [gender, setGender] = useState(null);
  const [privacy, setPrivacy] = useState(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Create Character Profile</Text>

        <View style={styles.inputContainer}>
          <View style={styles.topheadingContainer}>
            <Text style={styles.topheading}>Greeting</Text>
          </View>

          <View style={styles.subheadingContainer}>
            <Text style={styles.subheading}>Introduction of your character</Text>
          </View>

          <TextInput
            placeholder="Greeting"
            style={[styles.input, { height: 75 }]}
            mode="outlined"
            label={"Greeting"}
            activeOutlineColor={COLORS.black}
            contentStyle={{ paddingTop: SIZES.xLarge }}
            multiline
            maxLength={200}
            value={greeting}
            onChangeText={(text) => setGreeting(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.topheadingContainer}>
            <Text style={styles.topheading}>Character Short Description</Text>
          </View>

          <View style={styles.subheadingContainer}>
            <Text style={styles.subheading}>A short description for your character</Text>
          </View>

          <TextInput
            placeholder="A short description of your character."
            style={[styles.input, { height: 75 }]}
            mode="outlined"
            label={"Character Short Description"}
            activeOutlineColor={COLORS.black}
            contentStyle={{ paddingTop: SIZES.xLarge }}
            multiline
            textAlignVertical="top"
            maxLength={300}
            value={shortDescription}
            onChangeText={(text) => setShortDescription(text)}
          />
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


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, { backgroundColor: COLORS.white }]}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={}
            style={[styles.button, { backgroundColor: COLORS.blue }]}
          >
            <Text style={[styles.buttonText, { color: COLORS.white }]}>Next</Text>
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
  input: {
    height: 50,
    lineHeight: 20,
    borderRadius: 4,
    fontSize: FONTSIZE.small,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    width: "90%",
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
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONTSIZE.medium,
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
  },
  radioButtonSelected: {
    backgroundColor: COLORS.blue,
  },
  radioButtonLabelSelected: {
    color: COLORS.white,
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.small,
    textAlign: 'center',
  },
  privacyDescription: {
    textAlign: 'center',
    fontSize: FONTSIZE.small,
    marginTop: SIZES.small,
  },
});

export default CreateCharacter3;
