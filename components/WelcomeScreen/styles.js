import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  BackgroundContainer: {
    borderRadius: 10,
    flex: 1,
    width: "100%", 
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: FONTSIZE.xxLarge,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    zIndex: 2,
  },
  subheading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xLarge,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
  },
  robotImage1: {
    position: 'absolute',
    bottom: -windowHeight * 0.1, 
    right: windowWidth * 0.5,
    width: windowWidth * 0.75, 
    height: windowWidth * 0.75, 
    resizeMode: 'contain',
    transform: [{ rotate: '30deg' }],
  },
  robotImage2: {
    position: 'absolute',
    bottom: -windowHeight * 0.1, 
    right: -windowWidth * 0.2,
    width: windowWidth * 0.75, 
    height: windowWidth * 0.75, 
    resizeMode: 'contain',
  },
  button: {
    borderRadius: 50,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: 200,
    overflow: "hidden",
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONTSIZE.medium,
  },
});
