import { Pressable, StyleSheet } from "react-native";

import { getIcon } from "../Icons";

const IconButton = ({
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  onPress,
  containerStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle ? containerStyle : null,
        pressed && styles.btnPressed,
      ]}
    >
      {getIcon(iconName, iconSize, iconColor, iconStyle)}
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  btnPressed: {
    opacity: 0.9,
  },
});
