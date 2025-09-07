import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { COLORS, FONT_NUNITO } from "../../styles";

const TextButton = ({
  onPress,
  label,
  textStyle,
  containerStyle,
  isLoading,
  spinnerColor,
  icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle ? containerStyle : null,
        pressed && styles.btnPressed,
      ]}
    >
      <View style={styles.container}>
        {icon ? icon : null}
        {isLoading ? (
          <ActivityIndicator size="small" color={spinnerColor} />
        ) : (
          <Text style={[styles.label, textStyle]}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.black,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: "20%",
    marginVertical: 15,
  },
  btnPressed: {
    opacity: 0.9,
  },
  iconStyle: {
    marginRight: 10,
  },
  label: {
    fontFamily: FONT_NUNITO.bold,
    fontSize: 20,
    textAlign: "center",
    color: COLORS.white,
  },
});
