import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTSIZE, SIZES } from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { get_user_info, update_user } from "../../axios/user.jsx";

const EditProfile = () => {
  const userId = useSelector((state) => state.user.userID);
  const [refresh, setRefresh] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await get_user_info(userId);
      setSelectedImage(fetchedUserInfo.profile_picture);
      setFName(fetchedUserInfo.first_name);
      setLName(fetchedUserInfo.last_name);
      setBio(fetchedUserInfo.bio);
      setUsername(fetchedUserInfo.username);
      setGmail(fetchedUserInfo.gmail);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [refresh]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);
  const [bio, setBio] = useState(null);
  const [username, setUsername] = useState(null);
  const [gmail, setGmail] = useState(null);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View
            style={{
              alignItems: "center",
              marginVertical: 22,
            }}
          >
            <TouchableOpacity onPress={handleImageSelection}>
              <Image
                source={{ uri: selectedImage }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: COLORS.black,
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={32}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View
              style={styles.infoChildContainer}
            >
              <Text style={styles.heading}>Username</Text>
              <View
                style={styles.inputContainer}
              >
                <TextInput
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                  editable={true}
                  style={styles.input}
                />
              </View>
            </View>

            <View
              style={styles.infoChildContainer}
            >
              <Text style={styles.heading}>Bio</Text>
              <View
                style={styles.inputContainer}
              >
                <TextInput
                  value={bio}
                  onChangeText={(value) => setBio(value)}
                  editable={true}
                  style={[styles.input, { minHeight: 70 }]}
                  multiline={true}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "45%", marginHorizontal: 2.5 }}>
                <Text style={styles.heading}>First Name</Text>
                <View
                  style={styles.inputContainer}
                >
                  <TextInput
                    value={fname}
                    onChangeText={(value) => setFName(value)}
                    editable={true}
                  />
                </View>
              </View>
              <View style={{ width: "45%", marginHorizontal: 2.5 }}>
                <Text style={styles.heading}>Last Name</Text>
                <View
                  style={styles.inputContainer}
                >
                  <TextInput
                    value={lname}
                    onChangeText={(value) => setLName(value)}
                    editable={true}
                  />
                </View>
              </View>
            </View>

            <View
              style={styles.infoChildContainer}
            >
              <Text style={styles.heading}>Gmail</Text>
              <View
                style={styles.inputContainer}
              >
                <TextInput
                  value={gmail}
                  onChangeText={(value) => setGmail(value)}
                  editable={true}
                  style={styles.input}
                />
              </View>
            </View>

          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={async () => {
              try {
                await update_user(
                  userId,
                  username,
                  gmail,
                  fname,
                  lname,
                  null,
                  null,
                  bio,
                  selectedImage,
                  null,
                  null
                );
                setRefresh(!refresh);
              } catch (error) {
                console.error("Failed to update user info:", error);
              }
            }}
          >
            <Text
              style={styles.buttonText}
            >
              Save Change
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SIZES.xLarge
  },
  infoContainer: {
    marginBottom: SIZES.xLarge,
    marginHorizontal: SIZES.small,
    flexDirection: "column",
    justifyContent: "center",
  },
  infoChildContainer: {
    marginVertical: 10,
  },
  heading: {
    fontSize: FONTSIZE.small,
  },
  input: {

  },
  inputContainer: {
    borderColor: COLORS.black,
    borderRadius: 5,
    borderWidth: 1.25,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: "20%",
  },
  buttonText: {
    fontSize: FONTSIZE.small,
    color: COLORS.white,
  }
};