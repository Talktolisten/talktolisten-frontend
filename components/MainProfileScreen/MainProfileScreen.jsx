import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { StatusBar } from "expo-status-bar";

const ProfileStats = ({ title, value }) => (
  <View style={styles.statsContainer}>
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsTitle}>{title}</Text>
  </View>
);

const ProfileButton = ({ title }) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const MainProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />

      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/avatar.png")}
          resizeMode="contain"
          style={styles.avatar}
        />

        <Text style={styles.name}>Leo</Text>
        <Text style={styles.username}>@leotech</Text>

        <View style={styles.statsRow}>
          <ProfileStats title="Followers" value="122" />
          <ProfileStats title="Followings" value="67" />
          <ProfileStats title="Likes" value="77K" />
        </View>

        <View style={styles.buttonRow}>
          <ProfileButton title="Edit Profile" />
          <ProfileButton title="Add Friend" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: COLORS.black,
    borderWidth: 2,
    marginTop: 20,
    alignSelf: "left",
    marginLeft: 20,
  },
  name: {
    fontSize: FONTSIZE.xLarge,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 24,
    color: COLORS.black,
    marginVertical: 8,
  },
  username: {
    color: COLORS.black,
    fontSize: FONTSIZE.small,
    marginBottom: SIZES.large,
  },
  statsRow: {
    paddingVertical: 8,
    flexDirection: "row",
  },
  statsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: SIZES.small,
  },
  statsValue: {
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 22,
    color: COLORS.black,
  },
  statsTitle: {
    fontSize: FONTSIZE.medium,
    color: COLORS.black,
  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    width: 124,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
    borderRadius: 10,
    marginHorizontal: SIZES.small * 2,
  },
  buttonText: {
    fontSize: FONTSIZE.medium,
    color: COLORS.white,
  },
});

export default MainProfile;
