import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { COLORS, FONT_NUNITO, FONTSIZE } from "../../styles";

const IntroductionItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "cover" }]}
      />
      <View style={styles.textContainer}>
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
    alignItems: "center",
    paddingTop: 20,
  },
  image: {
    height: "50%",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FONT_NUNITO.bold,
    fontSize: FONTSIZE.xLarge,
    marginBottom: 10,
    color: COLORS.black,
    textAlign: "center",
    paddingTop: 20,
  },
  description: {
    fontFamily: FONT_NUNITO.regular,
    fontSize: FONTSIZE.small,
    color: COLORS.black,
    textAlign: "center",
    paddingHorizontal: 32,
    paddingTop: 10,
  },
});
