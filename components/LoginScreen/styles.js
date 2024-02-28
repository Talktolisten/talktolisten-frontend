import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  moodButton: {
    alignItems: "center",
    margin: 15,
    flex: 1,
  },
  exerciseBox: {
    width: 125,
    height: 125,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  moodButtonPressed: {
    opacity: 0.9,
  },
  loginBackgroundContainer: {
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
  loginBackground: {
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
  },
  subheading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xLarge,
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
  },
  loginHeading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xxLarge,
    color: COLORS.black,
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
  error: {
    color: COLORS.red,
    fontSize: FONTSIZE.small,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 18,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    width: "85%",
    marginLeft: 16,
  },
  inputContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  inputIcon: {
    marginBottom: 15,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 50,
  },
  button: {
    borderWidth: .5,
    borderRadius: 15,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONTSIZE.medium,
  },
});
