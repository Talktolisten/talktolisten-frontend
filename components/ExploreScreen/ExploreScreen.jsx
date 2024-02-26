import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import DynamicSearchBar from "./SearchBar";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { StatusBar } from "react-native";

import {
  explore_get_bots_categories,
  explore_get_bots_search,
} from "./ExploreRequest";
import { handlePressBot } from "./CreateChat";

const types = [
  "Featured",
  "Realistic",
  "Anime Characters",
  "Game Characters",
  "Movie Characters",
  "TV Characters",
  "Comic Characters",
  "Cartoon Characters",
  "Book Characters",
  "Language Learner",
  "Helpers",
];

const Explore = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState("Featured");
  const [newBots, setNewBots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let botInfo = "";

      if (searchTerm) {
        botInfo = await explore_get_bots_search(searchTerm);
      } else {
        botInfo = await explore_get_bots_categories(activeType);
      }

      try {
        setNewBots(botInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm, activeType]);

  const handleChangeText = (text) => {
    setSearchTerm(text);
  };

  const handleClearPress = () => {
    setSearchTerm("");
    setActiveType("Featured");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
      <SafeAreaView style={styles.container}>
        <DynamicSearchBar onChangeText={handleChangeText} onClearPress={handleClearPress} />
        <View style={styles.tabsContainer}>
          <FlatList
            data={types}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeType, item)}
                onPress={() => {
                  setActiveType(item);
                }}
              >
                <Text style={styles.tabText(activeType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        </View>

        <View style={styles.listSection}>
          <ScrollView style={styles.elementPallet}>
            {newBots.map((bot) => {
              return (
                <TouchableOpacity
                  style={styles.element}
                  key={bot.bot_id}
                  activeOpacity={0.8}
                  onPress={() => {
                    handlePressBot(bot.bot_id, navigation);
                  }}
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: COLORS.grey,
  },
  searchBar: {
    marginBottom: 12.5,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
    marginLeft: SIZES.small,
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
    marginTop: 10,
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
    marginBottom: 5
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
    height: 100,
  },
  botImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default Explore;
