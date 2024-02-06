import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Button } from "react-native";
import React, { useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";

const Voice = () => {
  const scaleValue1 = useRef(new Animated.Value(0)).current;
  const scaleValue2 = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();

  const {botInfo, chat_id} = route.params;
  console.log(botInfo);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue1, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue1, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue2, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 40}}>{botInfo.bot_name}</Text>
      <View style={styles.imageArea}>
        <Animated.View
          style={[
            styles.circle,
            {
              width: 340,
              height: 340,
              borderRadius: 170,
              transform: [{ scale: scaleValue1 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {
              width: 320,
              height: 320,
              borderRadius: 160,
              transform: [{ scale: scaleValue2 }],
            },
          ]}
        />
        <Image source={{uri: botInfo.profile_picture }} style={styles.imageItem} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(SCREEN_NAMES.CHAT)}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  imageItem: {
    width: 300,
    height: 300,
    borderRadius: 150,
    position: 'absolute',
  },
  circle: {
    borderColor: 'blue',
    borderWidth: 5,
    position: 'absolute',
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
  }
});

export default Voice;