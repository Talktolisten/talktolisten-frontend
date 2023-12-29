import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const dummyCharacters = [
  {
    id: 1,
    name: "Character 1",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Character 2",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Character 3",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Character 4",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    name: "Character 6",
    image: "https://via.placeholder.com/100",
  },
  // Add more dummy characters here
];

const Explore = () => {
  const renderCharacterItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar rounded source={{ uri: item.image }} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacterItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Explore;