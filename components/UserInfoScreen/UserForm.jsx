import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../styles";
import { checkUsername } from "../../axios/user";
import styles from "./styles";

const UserForm = ({ values, handleChange, handleBlur, handleSubmit }) => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const checkAndSetUsername = async (username) => {
    const isAvailable = await checkUsername(username);
    setUsernameAvailable(!isAvailable);
  };

  return (
    <View style={{ marginTop: 29 }}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => {
            handleChange("username")(text);
            checkAndSetUsername(text);
          }}
          onBlur={handleBlur("username")}
          value={values.username}
          placeholder="Username"
          style={styles.input}
          mode="outlined"
          label={"Username"}
          activeOutlineColor={COLORS.black}
        />
      </View>

      {!usernameAvailable && (
        <Text style={styles.userError}>Username is already taken</Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleChange("fname")}
          onBlur={handleBlur("fname")}
          value={values.fname}
          placeholder="First Name"
          style={styles.input}
          mode="outlined"
          label={"First Name"}
          activeOutlineColor={COLORS.black}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleChange("lname")}
          onBlur={handleBlur("lname")}
          value={values.lname}
          placeholder="Last Name"
          style={styles.input}
          mode="outlined"
          label={"Last Name"}
          activeOutlineColor={COLORS.black}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, "");
            let formattedValue = numericValue;

            if (numericValue.length <= 2) {
              formattedValue = numericValue;
            } else if (numericValue.length <= 4) {
              formattedValue =
                numericValue.substring(0, 2) +
                " / " +
                numericValue.substring(2);
            } else {
              formattedValue =
                numericValue.substring(0, 2) +
                " / " +
                numericValue.substring(2, 4) +
                " / " +
                numericValue.substring(4);
            }

            handleChange("dob")(formattedValue);
          }}
          onBlur={handleBlur("dob")}
          value={values.dob}
          placeholder="MM / DD / YYYY (Optional)"
          style={styles.input}
          keyboardType="numeric"
          maxLength={14}
          mode="outlined"
          label={"Date of Birth (Optional)"}
          activeOutlineColor={COLORS.black}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, { backgroundColor: COLORS.blue }]}
      >
        <LinearGradient
          colors={["rgba(208, 179, 184, 255)", "rgba(237,196,132,255)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserForm;
