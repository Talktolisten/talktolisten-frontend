import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { StatusBar } from "expo-status-bar";
import CharacterProfile from "../CharacterProfileScreen/CharacterProfileScreen";
import { get_bot_info } from "../../axios/bots";

const CreateCharacter5 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bot_id } = route.params;
  const [botInfo, setBotInfo] = useState({});

  const fetchBotInfo = async () => {
    try {
      const fetchedBotInfo = await get_bot_info(bot_id);
      setBotInfo(fetchedBotInfo);
    } catch (error) {
      console.error("Failed to fetch bot info:", error);
    }
  };

  useEffect(() => {
    fetchBotInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />
      <CharacterProfile botInfo={botInfo} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  button: {
    borderRadius: 10,
    height: 55,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: SIZES.large,
    width: "55%",
    overflow: "hidden",
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONTSIZE.medium,
  },
});

export default CreateCharacter5;
