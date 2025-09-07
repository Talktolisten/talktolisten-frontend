import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { StatusBar } from "expo-status-bar";
import { get_random_bot } from "../../axios/bots";
import CharacterProfile from "../CharacterProfileScreen/CharacterProfileScreen";

const RandomCharacter = () => {
  const navigation = useNavigation();

  const [botInfo, setBotInfo] = useState({});

  const fetchRandomBot = async () => {
    try {
      const fetchedBotInfo = await get_random_bot();
      setBotInfo(fetchedBotInfo);
    } catch (error) {
      console.error("Failed to fetch random bot:", error);
    }
  };

  useEffect(() => {
    fetchRandomBot();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />
      <CharacterProfile botInfo={botInfo} navigation={navigation} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => fetchRandomBot()}
          style={styles.button}
        >
          <LinearGradient
            colors={["rgba(208, 179, 200, 255)", "rgba(237,196,132,255)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
          <Text style={styles.buttonText}>Surprised me</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: SIZES.medium,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: SIZES.large,
    width: "55%",
    overflow: "hidden",
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONTSIZE.small,
  },
});

export default RandomCharacter;
