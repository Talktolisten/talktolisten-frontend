import React, { useState } from "react";
import { Text, SafeAreaView, View, Switch } from "react-native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";

const Notification = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>System Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor={COLORS.grey}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Character Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor={COLORS.grey}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  switchText: {
    fontSize: FONTSIZE.medium,
  },
};
