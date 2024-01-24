import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { StatusBar } from "expo-status-bar";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import auth from "../../firebase";

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
  async function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("logged out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} />

      <View style={styles.profileContainer}>
        <View style={styles.mainProfileContainer}>
          <Image
            source={require("../../assets/images/avatar.png")}
            resizeMode="contain"
            style={styles.avatar}
          />

          <View style={styles.info}>
            <Text style={styles.name}>Leo</Text>
            <Text style={styles.username}>@leotech</Text>
          </View>

          <TouchableOpacity
          // onPress={() => {
          //   /* navigation logic here */
          // }}
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
