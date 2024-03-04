import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";

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
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  moodButtonPressed: {
    opacity: 0.9,
  },
  image: {
    width: 75,
    height: 75,
  },
  heading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: FONTSIZE.xxLarge,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },
  subheading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    color: COLORS.black,
  },
  userError: {
    color: COLORS.red,
    fontSize: FONTSIZE.small,
    textAlign: "center",
    marginBottom: SIZES.small
  },
  input: {
    height: 50,
    lineHeight: 20,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 18,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    width: "90%",
    marginLeft: 16,
  },
  inputContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
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
    width: "90%",
    overflow: "hidden",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});
