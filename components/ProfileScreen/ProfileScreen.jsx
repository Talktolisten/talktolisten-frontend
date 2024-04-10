import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "../../firebase";
import { removeTokens } from "../../util/tokenUtils";
import { removeUserID } from "../../redux/actions/userActions";
import { defaultAvatarURL } from "../../util/constants";
import { get_user_info, deleteAccount } from "../../axios/user";

const SettingItem = ({ type, icon, text, color, onPress }) => {
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
        color={color || COLORS.black}
        style={styles.icon}
      />
      <Text style={styles.settingText}>{text}</Text>
      <MaterialIcons
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
  const dispatch = useDispatch();
  const [guest_mode, setGuestMode] = useState(false);

  useEffect(() => {
    async function checkGuestMode() {
      const isGuest = await AsyncStorage.getItem('@GuestMode');
      setGuestMode(isGuest === 'TRUE' ? true : false);
    }

    checkGuestMode();
  }, []);

  async function logout() {
    signOut(auth)
      .then(() => {
        removeTokens();
        dispatch(removeUserID());
        console.log("User logged out");
        navigation.reset({
          index: 0,
          routes: [{ name: SCREEN_NAMES.WELCOME }],
        });
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
        {/* <SettingItem
          type="Feather"
          icon="play-circle"
          text="Subscription"
          onPress={() => {
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="mode-edit"
          text="Edit Profile"
          onPress={() => {
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="settings"
          text="Settings"
          onPress={() => {
          }}
        /> */}
        <SettingItem
          type="MaterialCommunityIcons"
          icon="cards-heart"
          text="Liked Characters"
          color={COLORS.red}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.LIKED_CHARACTERS);
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="create"
          text="Your Characters"
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.CREATED_CHARACTERS);
          }}
        />
        <SettingItem
          type="MaterialCommunityIcons"
          icon="theme-light-dark"
          text="Theme"
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.THEME_SETTING);
          }}
        />
        {/* <SettingItem
          type="MaterialIcons"
          icon="language"
          text="Language"
          onPress={() => {
          }}
        /> */}
        <SettingItem
          type="MaterialIcons"
          icon="notifications-on"
          text="Notifications"
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.NOTIFICATION);
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="feedback"
          text="Feedback - Contact us"
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.FEEDBACK);
          }}
        />
        <SettingItem
          type="MaterialIcons"
          icon="report"
          text="Report a problem"
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.REPORT);
          }}
        />
        <SettingItem
          type="MaterialCommunityIcons"
          icon="information"
          text="About us"
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.ABOUT_US);
          }}
        />
        {guest_mode ?
          <TouchableOpacity
            style={[styles.button, { borderColor: COLORS.black, backgroundColor: COLORS.black, overflow: 'hidden' }]}
            onPress={async () => {
              await deleteAccount(userId);
              await AsyncStorage.setItem('@GuestMode', "FALSE");
              logout();
            }}
          >
            <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.regular }]}>Sign up to get start</Text>
          </TouchableOpacity> : (
            <View>
              <TouchableOpacity
                style={[styles.button, { borderColor: COLORS.black }]}
                onPress={async () => {
                  logout();
                }}
              >
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { borderColor: COLORS.red, backgroundColor: COLORS.red }]}
                onPress={() => {
                  Alert.alert(
                    "Delete Account",
                    "Are you sure you want to delete your account? This action cannot be undone.",
                    [
                      {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      {
                        text: "Yes",
                        onPress: async () => {
                          try {
                            await deleteAccount(userId);
                            logout();
                          } catch (error) {
                            console.error(error);
                          }
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text style={[styles.buttonText, { color: COLORS.white, fontWeight: FONT_WEIGHT.bold }]}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          )}
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
    alignSelf: "center",
    marginTop: 30,
    width: "70%",
  },
  buttonText: {
    color: COLORS.black,
    fontSize: FONTSIZE.medium,
  },
});

export default Profile;
