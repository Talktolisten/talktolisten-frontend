import { Text, View, TextInput, StyleSheet } from 'react-native';

import TextButton from './TextButton';

import { COLORS, FONT_NUNITO } from '../../styles';
import { getIcon } from '../Icons';

const Input = ({
  label,
  onChange,
  icon,
  buttonText,
  onButtonPress,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>{label}</Text>
        {buttonText && (
          <TextButton
            label={buttonText}
            textStyle={styles.buttonText}
            onPress={onButtonPress}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            {getIcon(icon, 30, COLORS.green_light, { marginHorizontal: 12.5 })}
          </View>
        )}
        <TextInput
          {...inputProps}
          onChangeText={onChange}
          style={[
            styles.input,
            icon ? styles.paddingRight : styles.paddingHorizontal,
          ]}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginVertical: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  inputContainer: {
    height: 55,
    borderWidth: 3,
    borderColor: COLORS.yellow_light,
    borderRadius: 15,
    flexDirection: 'row',
  },
  label: {
    fontFamily: FONT_NUNITO.bold,
    fontSize: 20,
    color: COLORS.black,
  },
  buttonText: {
    fontFamily: FONT_NUNITO.regular,
    fontSize: 14,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.black,
    fontSize: 16,
  },
  paddingRight: {
    paddingRight: 5,
  },
  paddingHorizontal: {
    paddingHorizontal: 5,
  },
});
