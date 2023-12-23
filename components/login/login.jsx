import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, TextInput } from "react-native";
import { Formik } from "formik";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>Welcome back</Text>
      <Text style={styles.subheading}>Enter your credential to continue</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ marginTop: 29 }}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                name="lock1"
                size={24}
                color="black"
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity style={[styles.button, { backgroundColor: "black" }]}>
        <Text style={styles.buttonText}>Log in using apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#EEECE9" }]}>
        <Text style={[styles.buttonText, { color: "black" }]}>
          Log in using google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 56,
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
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
  inputIcon: {
    marginBottom: 15,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 50, // Adjust the value to control the amount of rounding
    // Add any other styles you need
  },
  button: {
    backgroundColor: "#F9A826",
    borderRadius: 50,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
