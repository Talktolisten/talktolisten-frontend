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
  input: {
    height: 50,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 18,
    backgroundColor: COLORS.white,
    width: "85%",
    marginLeft: 16,
  },
  inputContainer: {
    marginVertical: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  inputIcon: {
    alignSelf: "center",
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 50,
  },
  button: {
    borderWidth: .5,
    borderRadius: 50,
    width: "80%",
    height: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});
