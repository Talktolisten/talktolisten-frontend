import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { COLORS, FONT_NUNITO } from '../../styles';

const IntroductionItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: 'cover' }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default IntroductionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_NUNITO.bold,
    fontSize: 28,
    marginBottom: 10,
    color: COLORS.black,
    textAlign: 'center',
    paddingTop: 20,
  },
  description: {
    fontFamily: FONT_NUNITO.regular,
    fontSize: 17,
    color: COLORS.black,
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingTop: 10,
  },
});
