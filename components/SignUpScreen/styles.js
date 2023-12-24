import { StyleSheet } from "react-native";
import { COLORS } from "../../util/constants";

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
    backgroundColor: "beige",
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
    color: "black",
  },
  subheading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    color: "#807878",
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#74777F",
    borderRadius: 4,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 20,
    width: 287,
    marginLeft: 16,
  },
  inputContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#F9A826",
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
