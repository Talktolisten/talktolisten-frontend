import { Text, View, StyleSheet } from 'react-native';

import { COLORS, FONT_NUNITO } from '../../styles';

const PageTitle = ({
  title,
  subTitle,
  titleStyles,
  subTitleStyles,
  containerStyles,
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      {subTitle && (
        <Text style={[styles.subTitle, subTitleStyles]}>{subTitle}</Text>
      )}
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 25,
  },
  title: {
    fontFamily: FONT_NUNITO.bold,
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: FONT_NUNITO.regular,
    fontSize: 20,
    marginTop: 10,
    color: COLORS.black,
    textAlign: 'center',
  },
});
