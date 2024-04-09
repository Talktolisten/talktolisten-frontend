import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import { SCREEN_NAMES } from "../../util/constants";
import { generate_greeting_description } from "../../axios/bots";

const CreateCharacter = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Create your Character</Text>

        <View style={styles.inputContainer}>
          <View style={styles.topheadingContainer}>
            <Text style={styles.topheading}>Name</Text>
          </View>

          <View style={styles.subheadingContainer}>
            <Text style={styles.subheading}>Name your character</Text>
          </View>

          <TextInput
            placeholder="Name"
            style={[styles.input, { paddingBottom: 0 }]}
            mode="outlined"
            label={"Character Name"}
            activeOutlineColor={COLORS.black}
            maxLength={50}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.topheadingContainer}>
            <Text style={styles.topheading}>Character Description</Text>
          </View>

          <View style={styles.subheadingContainer}>
            <Text style={styles.subheading}>Define your character's unique personality traits. The more detailed you are, the more realistic your character will be.</Text>
          </View>

          <TextInput
            placeholder="A cute cat with a big heart"
            style={[styles.input, { height: 200 }]}
            mode="outlined"
            label={"Character Definition"}
            activeOutlineColor={COLORS.black}
            contentStyle={{ paddingTop: SIZES.xLarge }}
            multiline
            maxLength={1000}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.blue} />
          ) : (
            <TouchableOpacity
              onPress={generateCharacter}
              style={[styles.button, { backgroundColor: COLORS.blue }]}
            >
              <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.bold }]}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONTSIZE.medium,
  },
});

export default CreateCharacter;
