import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TextInput } from 'react-native-paper';
import { SCREEN_NAMES } from "../../util/constants";
import { generate_greeting_description, optimize_description } from "../../axios/bots";

const CreateCharacter = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const [guest_mode, setGuestMode] = useState(false);

  useEffect(() => {
    async function checkGuestMode() {
      const isGuest = await AsyncStorage.getItem('@GuestMode');
      setGuestMode(isGuest === 'TRUE' ? true : false);
    }

    checkGuestMode();
  }, []);

  const generateCharacter = async () => {
    setLoading(true);
    try {
      const { greeting, short_description } = await generate_greeting_description(name, description);
      navigation.navigate(SCREEN_NAMES.CREATE_CHARACTER_2, { name: name, description: description, greeting_ai: greeting, short_description_ai: short_description });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const optimizeDescription = async () => {
    setLoading(true);
    const optimized_description = await optimize_description(name, description);
    setDescription(optimized_description);
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {guest_mode ? (
        <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
          <TouchableOpacity
            style={[styles.button, { width: "80%", borderColor: COLORS.black, backgroundColor: COLORS.light_black, overflow: 'hidden' }]}
            onPress={async () => {
              navigation.navigate(SCREEN_NAMES.PROFILE);
            }}
          >
            <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.regular }]}>Sign up to create your own character</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: "25%" }}>
            <View style={styles.inputContainer}>
              <View style={styles.topheadingContainer}>
                <Text style={styles.topheading}>Name</Text>
              </View>

              <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>Name your character</Text>
                <View
                  style={isNameFocused ? [styles.inputSmallContainer, styles.inputContainerFocused] : styles.inputSmallContainer}
                >
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={COLORS.cool_grey}
                    maxLength={50}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    placeholder="Whiskers"
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.topheadingContainer}>
                <Text style={styles.topheading}>Character Description</Text>
              </View>

              <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>Define your character's unique personality traits. The more detailed you are, the more realistic your character will be.</Text>
                <View
                  style={isDescriptionFocused ? [styles.inputSmallContainer, styles.inputContainerFocused] : styles.inputSmallContainer}
                >
                  <TextInput
                    placeholder="A cute cat with a big heart"
                    style={[styles.input, { minHeight: 150 }]}
                    placeholderTextColor={COLORS.cool_grey}
                    multiline
                    maxLength={1000}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    onFocus={() => setIsDescriptionFocused(true)}
                    onBlur={() => setIsDescriptionFocused(false)}
                  />
                </View>
                <View style={styles.helperButtonContainer}>
                  <TouchableOpacity>
                    <Text
                      style={styles.helperButtonText}
                      onPress={optimizeDescription}
                    >
                      Revise
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.blue} />
            ) : (
              <TouchableOpacity
                onPress={generateCharacter}
                style={[styles.button, { backgroundColor: COLORS.blue }]}
              >
                <Text style={[styles.buttonText]}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>)}
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  topheadingContainer: {
    marginBottom: SIZES.xSmall,
  },
  topheading: {
    fontSize: FONTSIZE.small,
    fontWeight: FONT_WEIGHT.bold,
  },
  subheadingContainer: {
    alignSelf: "center",
    marginBottom: SIZES.small,
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  subheading: {
    fontSize: FONTSIZE.xSmall,
  },
  input: {
    borderRadius: 5,
  },
  inputSmallContainer: {
    backgroundColor: COLORS.bright_grey,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginTop: 10,
    width: "100%",
  },
  inputContainerFocused: {
    borderColor: COLORS.light_black,
    borderWidth: 1.25,
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
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.white,
    fontSize: FONTSIZE.xSmall,
  },
  helperButtonContainer: {
    alignItems: "flex-start",
    marginTop: SIZES.xSmall,
  },
  helperButtonText: {
    color: COLORS.purple,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONTSIZE.xSmall,
  },
});

export default CreateCharacter;
