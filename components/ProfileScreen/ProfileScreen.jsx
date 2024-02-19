import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { StatusBar } from "expo-status-bar";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import auth from "../../firebase";
import { removeTokens } from "../../util/tokenUtils";
import { defaultAvatarURL } from "../../util/constants";
import { get_user_info } from "../../axios/user";

const SettingItem = ({ type, icon, text, onPress }) => {
  const ICONCOMPONENTS = {
    Feather: Feather,
    MaterialIcons: MaterialIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
  };
  const IconComponent = ICONCOMPONENTS[type];
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <IconComponent
        name={icon}
        size={24}
        color={COLORS.black}
        style={styles.icon}
      />
      <Text style={styles.settingText}>{text}</Text>
      <IconComponent
        name="chevron-right"
        size={24}
        color={COLORS.black}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const Profile = () => {
  const navigation = useNavigation();

  async function logout() {
    removeTokens();
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            source={{ uri: defaultAvatarURL[0] }}
            resizeMode="contain"
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.info}
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.USER_PROFILE);
            }}
          >
            <Text style={styles.name}>{userInfo.first_name} {userInfo.last_name}</Text>
            <Text style={styles.username}>@{userInfo.username}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREEN_NAMES.USER_PROFILE);
            }}
          >
            <Feather
              name="arrow-right"
              size={30}
              color={COLORS.light_black}
              style={styles.mainProfileicon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingList}>
        <SettingItem
          type="Feather"
          icon="play-circle"
          text="Subscription"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="mode-edit"
          text="Edit Profile"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="settings"
          text="Settings"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <SettingItem
          type="MaterialCommunityIcons"
          icon="theme-light-dark"
          text="Theme"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="language"
          text="Language"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="notifications-on"
          text="Notifications"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <SettingItem
          type="MaterialCommunityIcons"
          icon="information-outline"
          text="About us"
          onPress={() => {
            /* navigation logic here */
          }}
        />
        <TouchableOpacity
          style={[styles.button, { borderColor: COLORS.black }]}
          onPress={async () => {
            logout();
          }}
        >
          <Text style={styles.buttonText}>Log out</Text>
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
  profileContainer: {
    alignItems: "center",
  },
  mainProfileContainer: {
    flexDirection: "row",
    paddingTop: 20,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 15,
    borderColor: COLORS.black,
    borderWidth: 2,
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  name: {
    fontSize: FONTSIZE.xLarge,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
    textAlign: "left",
  },
  username: {
    color: COLORS.black,
    fontSize: FONTSIZE.medium,
    marginBottom: SIZES.xLarge,
    textAlign: "left",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 30,
    marginVertical: 20,
    paddingVertical: 20,
  },
  mainProfileicon: {
    marginTop: 60,
    marginRight: 30,
  },
  settingList: {
    flexDirection: "column",
    marginTop: 30,
    marginHorizontal: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Add this
    marginVertical: 10,
  },
  settingText: {
    flex: 1, // Add this
    marginLeft: 10, // Add this
    fontSize: FONTSIZE.medium,
    color: COLORS.black,
  },
  icon: {
    marginRight: 10, // Add this
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: FONTSIZE.medium,
  },
});

export default Profile;
