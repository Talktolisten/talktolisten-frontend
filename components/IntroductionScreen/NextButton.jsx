import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Iconify } from 'react-native-iconify';
import { COLORS, FONT_NUNITO } from '../../styles';

const NextButton = ({ scrollTo, lastSlide }) => {
  const lastButton = lastSlide ? 'Get Started' : 'Next';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Text style={styles.buttonText}>{lastButton}</Text>
        <Iconify icon="bi:forward-fill" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: FONT_NUNITO.bold,
    fontSize: 20,
    color: COLORS.white,
    paddingRight: 6,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.green_dark,
    width: 250,
    borderRadius: 15,
    height: 60,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
