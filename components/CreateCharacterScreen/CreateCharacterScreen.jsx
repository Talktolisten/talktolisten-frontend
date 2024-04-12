import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from 'react-native-paper';
import { SCREEN_NAMES } from "../../util/constants";
import { generate_greeting_description } from "../../axios/bots";

const CreateCharacter = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
                <TextInput
                  placeholder="Name"
                  style={[styles.input, { paddingBottom: 0 }]}
                  mode="outlined"
                  activeOutlineColor={COLORS.black}
                  maxLength={50}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.topheadingContainer}>
                <Text style={styles.topheading}>Character Description</Text>
              </View>

              <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>Define your character's unique personality traits. The more detailed you are, the more realistic your character will be.</Text>
                <TextInput
                  placeholder="A cute cat with a big heart"
                  style={[styles.input, { height: 150 }]}
                  mode="outlined"
                  activeOutlineColor={COLORS.black}
                  contentStyle={{ paddingTop: SIZES.xLarge }}
                  multiline
                  maxLength={1000}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
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
});

export default CreateCharacter;
