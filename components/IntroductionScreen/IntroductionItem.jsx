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
        style={[styles.image, { width, resizeMode: 'contain' }]}
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
  },
  description: {
    fontFamily: FONT_NUNITO.regular,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
