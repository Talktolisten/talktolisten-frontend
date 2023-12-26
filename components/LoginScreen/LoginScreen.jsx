import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, TextInput } from "react-native";
import { Formik } from "formik";
import { SCREEN_NAMES } from "../../util/constants";
import styles from "./styles";
import { COLORS, FONT_NUNITO, FONT_WEIGHT } from "../../styles";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.subheading}>Let's talk</Text>
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
                color={COLORS.black}
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
                color={COLORS.black}
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

            <TouchableOpacity
              style={{
                width: "95%",
                fontWeight: FONT_WEIGHT.bold,
                justifyContent: "center",
                textAlign: "center",
              }}
              onPress={() => navigation.navigate(SCREEN_NAMES.RESET_PASSWORD)}
            >
              <Text style={{ textAlign: "right", fontWeight: FONT_WEIGHT.regular }}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: COLORS.blue }]}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.black }]}>
        <Text style={styles.buttonText}>Log in using Apple ID</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.white }]}>
        <Text style={[styles.buttonText, { color: COLORS.black }]}>
          Log in using Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 30,
          fontWeight: FONT_WEIGHT.bold,
          justifyContent: "center",
          textAlign: "center",
        }}
        onPress={() => navigation.navigate(SCREEN_NAMES.SIGNUP)}
      >
        <Text style={{ textAlign: "center", fontWeight: FONT_WEIGHT.bold }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
