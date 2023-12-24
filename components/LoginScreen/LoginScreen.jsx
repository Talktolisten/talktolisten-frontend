import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, TextInput } from "react-native";
import { Formik } from "formik";
import { SCREEN_NAMES } from "../../util/constants";
import styles from "./styles";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
        onPress={() => navigation.navigate(SCREEN_NAMES.SIGNUP)}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
