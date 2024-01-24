import React, { useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

import DynamicSearchBar from "../ExploreScreen/SearchBar";

import bots from "../../data/bots.json";
import "./styles";
import Chat from "./Chat";
const Explore = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <DynamicSearchBar />
      <View style={styles.listSection}>
        <ScrollView style={styles.elementPallet}>
          {bots.map((bot) => {
            return <Chat key={bot.bot_id} bot={bot} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;
