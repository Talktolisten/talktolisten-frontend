import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { StatusBar } from "expo-status-bar";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { defaultAvatarURL, defaultBio } from "../../util/constants";
import { get_user_info } from "../../axios/user";

const UserProfile = () => {
  const navigation = useNavigation();

  const userId = useSelector((state) => state.user.userID);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await get_user_info(userId);
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />

      <View style={styles.profileContainer}>
        <View style={styles.mainProfileContainer}>
          <Image
            source={{ uri: userInfo.profile_picture }}
            resizeMode="contain"
            style={styles.avatar}
          />

          <View style={styles.info}>
            <Text style={styles.name}>{userInfo.first_name}</Text>
            <Text style={styles.username}>@{userInfo.username}</Text>
          </View>
          <Text style={styles.bio}>{userInfo.bio === null ? defaultBio[6] : userInfo.bio}</Text>

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
    alignItems: "center",
    marginTop: 10,
  },
  mainProfileContainer: {
    width: "100%",
    flexDirection: "column",
    paddingTop: 20,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 15,
    borderColor: COLORS.black,
    borderWidth: 2,
    marginTop: 20,
    alignSelf: "center",
  },
  name: {
    fontSize: FONTSIZE.xLarge,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginTop: 15,
    marginBottom: SIZES.xSmall,
    textAlign: "center",
  },
  username: {
    color: COLORS.black,
    fontSize: FONTSIZE.medium,
    marginBottom: SIZES.xLarge,
    textAlign: "center",
  },
  bio: {
    color: COLORS.black,
    fontSize: FONTSIZE.xSmall,
    marginBottom: SIZES.xLarge,
    textAlign: "left",
    marginHorizontal: 15
  }
});

export default UserProfile;
