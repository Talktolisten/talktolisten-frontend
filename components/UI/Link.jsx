import { View, Text, StyleSheet } from 'react-native';

import TextButton from './TextButton';

import { COLORS, FONT_NUNITO } from '../../styles';

const Link = ({ containerStyles, textStyles, onPress, text, linkText }) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.text, textStyles]}>{text}</Text>
      <TextButton onPress={onPress} label={linkText} textStyle={styles.link} />
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginVertical: 20,
  },
  text: {
    fontFamily: FONT_NUNITO.regular,
    color: COLORS.black,
    fontSize: 15,
    marginRight: 3,
  },
  link: {
    color: COLORS.yellow_dark,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
