import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import DynamicSearchBar from "../ExploreScreen/SearchBar";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { StatusBar } from "react-native";
import { get_created_bot } from "../../axios/bots";

import {
  explore_get_bots_categories,
  explore_get_bots_search,
} from "../ExploreScreen/ExploreRequest";

const CreateGroupChat = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("explore");
  const [activeType, setActiveType] = useState("Featured");
  const [newBots, setNewBots] = useState([]);
  const [groupchatBots, setGroupchatBots] = useState([]);
  const [groupchatLength, setGroupchatLength] = useState(groupchatBots.length);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setGroupchatLength(groupchatBots.length);
  }, [groupchatBots]);

  useEffect(() => {
    const fetchData = async () => {
      let botInfo;
      if (mode == "explore") {
        if (searchTerm) {
          botInfo = await explore_get_bots_search(searchTerm);
        } else {
          botInfo = await explore_get_bots_categories(activeType);
        }
      } else {
        botInfo = await get_created_bot();
      }

      try {
        setNewBots(botInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, activeType, mode]);

  const handleChangeText = (text) => {
    setSearchTerm(text);
  };

  const handleClearPress = () => {
    setSearchTerm("");
    setActiveType("Featured");
  };

  const handlePressBot = async (bot) => {
    if (
      groupchatBots.find((b) => b.bot_id === bot.bot_id) ||
      groupchatBots.length >= 9
    ) {
      return;
    }
    try {
      setGroupchatBots([...groupchatBots, bot]);
    } catch (error) {
      console.error("Failed to add bot to group chat:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.grey,
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={botsHolderStyles.container}>
          <Text style={botsHolderStyles.heading}>
            Group Chat ({groupchatLength}/9)
          </Text>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={botsHolderStyles.scrollViewContainer}
            style={botsHolderStyles.scrollView}
          >
            {groupchatBots.map((bot) => {
              return (
                <View
                  key={bot.bot_id}
                  style={botsHolderStyles.botObjectContainer}
                >
                  <Image
                    source={{ uri: bot.profile_picture }}
                    style={botsHolderStyles.botImage}
                  />
                  <Text style={botsHolderStyles.botName}>{bot.bot_name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      setGroupchatBots(
                        groupchatBots.filter((b) => b.bot_id !== bot.bot_id),
                      )
                    }
                  >
                    <Feather name="x" size={16} color={COLORS.red} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.radioButtonContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={[
                styles.radioButton,
                mode === "explore" ? styles.radioButtonSelected : {},
              ]}
              onPress={() => setMode("explore")}
            >
              <Text
                style={[
                  styles.radioButtonLabel,
                  mode === "explore" ? styles.radioButtonLabelSelected : {},
                ]}
              >
                Explore
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                mode === "your-bot" ? styles.radioButtonSelected : {},
              ]}
              onPress={() => setMode("your-bot")}
            >
              <Text
                style={[
                  styles.radioButtonLabel,
                  mode === "your-bot" ? styles.radioButtonLabelSelected : {},
                ]}
              >
                Your Characters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {mode == "explore" ? (
          <DynamicSearchBar
            onChangeText={handleChangeText}
            onClearPress={handleClearPress}
          />
        ) : null}
        <View style={styles.listSection}>
          <ScrollView style={styles.elementPallet}>
            {newBots.map((bot) => {
              return (
                <TouchableOpacity
                  style={styles.element}
                  key={bot.bot_id}
                  activeOpacity={0.8}
                  onPress={handlePressBot.bind(this, bot)}
                >
                  <View style={styles.infoArea}>
                    <Text style={styles.infoTitle}>{bot.bot_name}</Text>
                    <Text style={styles.infoSub}>{bot.short_description}</Text>
                    <View style={styles.inforMoreContainer}>
                      <View style={styles.infoChat}>
                        <Ionicons
                          name="chatbubble-ellipses-outline"
                          size={FONTSIZE.xSmall}
                          color={COLORS.black}
                          style={styles.infoIcon}
                        />
                        <Text>{bot.num_chats}</Text>
                      </View>
                      <View style={styles.infoLikes}>
                        <Ionicons
                          name="heart"
                          size={FONTSIZE.xSmall}
                          color={COLORS.pink}
                          style={styles.infoIcon}
                        />
                        <Text>{bot.likes}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.imageArea}>
                    <Image
                      source={{ uri: bot.profile_picture }}
                      resizeMode="cover"
                      style={styles.botImage}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (groupchatBots.length < 2) {
                Alert.alert(
                  "",
                  "Please select at least 2 characters to create a group chat.",
                );
                return;
              }
              navigation.navigate(SCREEN_NAMES.CREATE_GROUP_CHAT_2, {
                group_bots: groupchatBots,
              });
            }}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: COLORS.grey,
    width: "100%",
  },
  searchBar: {
    marginBottom: 12.5,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
    marginLeft: SIZES.xSmall,
    paddingHorizontal: SIZES.small,
  },
  tab: (activeType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: activeType === item ? COLORS.light_black : COLORS.white,
    borderColor: activeType === item ? COLORS.black : COLORS.black,
  }),
  tabText: (activeType, item) => ({
    color: activeType === item ? COLORS.white : COLORS.black,
  }),
  listSection: {
    flex: 1,
  },
  elementPallet: {
    paddingTop: SIZES.small,
    marginLeft: 10,
    marginRight: 10,
  },
  element: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
  },
  infoArea: {
    flex: 3,
    justifyContent: "space-between",
    marginRight: 10,
  },
  infoTitle: {
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: 5,
  },
  infoSub: {
    fontSize: FONTSIZE.xSmall,
  },
  inforMoreContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    fontSize: FONTSIZE.xSmall,
  },
  infoChat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  infoLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 5,
  },
  imageArea: {
    flex: 1,
    height: 75,
  },
  botImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  radioButton: {
    padding: 10,
    width: "47.5%",
    borderRadius: 5,
    borderColor: COLORS.cool_grey,
    borderWidth: 0.5,
  },
  radioButtonSelected: {
    borderColor: COLORS.light_black,
    borderWidth: 1,
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.xSmall,
    color: COLORS.light_black,
    textAlign: "center",
    fontWeight: FONT_WEIGHT.medium,
  },
  radioButtonLabelSelected: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
  },
  buttonContainer: {
    width: "30%",
    position: "absolute",
    bottom: "5%",
    right: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTSIZE.small,
    fontWeight: FONT_WEIGHT.medium,
  },
});

const botsHolderStyles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  heading: {
    fontSize: FONTSIZE.small,
    fontWeight: FONT_WEIGHT.regular,
    marginBottom: 10,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  scrollView: {
    minHeight: 100,
    maxHeight: 125,
    width: "100%",
  },
  botObjectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderColor: COLORS.light_black,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 20,
  },
  botImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  botName: {
    fontSize: FONTSIZE.xSmall,
    marginHorizontal: 5,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "100%",
    margin: 5,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: "80%",
    width: "100%",
  },
});

export default CreateGroupChat;
