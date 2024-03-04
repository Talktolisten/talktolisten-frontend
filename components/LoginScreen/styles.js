import { StyleSheet } from "react-native";
import { COLORS, FONTSIZE, FONT_WEIGHT, SIZES } from "../../styles";
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
  heading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xxLarge,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },
  subheading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    color: COLORS.black,
  },
  error: {
    color: COLORS.red,
    fontSize: FONTSIZE.small,
    textAlign: "center",
  },
  input: {
    height: 60,
    lineHeight: 20,
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
    borderRadius: 10,
    height: 55,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "85%",
    overflow: "hidden",
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONTSIZE.medium,
  },
});
