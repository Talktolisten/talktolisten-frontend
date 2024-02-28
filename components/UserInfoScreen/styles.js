import { StyleSheet } from "react-native";
import { COLORS } from "../../styles";

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
    backgroundColor: COLORS.beige,
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
    marginTop: 10,
    fontSize: 32,
    color: COLORS.black,
  },
  subheading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    color: COLORS.black,
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
    marginVertical: 10,
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
    borderWidth: 0.5,
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});
