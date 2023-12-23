import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableWithoutFeedback, 
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';

const SignUpPage = () => {


    return (
            <SafeAreaView style={styles.container}>

            <TouchableOpacity> 
                <AntDesign name="arrowleft" size={24} color="black" /> 
            </TouchableOpacity>
             
              <Text style={styles.heading}>Create account</Text>
              <Text style={styles.subheading}>Sign up to get started!</Text>
              <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={(values) => console.log(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={{ marginTop: 29 }}>
                    <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                      <TextInput
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="Email"
                        style={styles.input}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={24} color="black" />
                    <TextInput
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      placeholder="Username"
                      style={styles.input}
                    />
                    </View>

                    <View style={styles.inputContainer}>
                    <AntDesign name="lock1" size={24} color="black" />
                    <TextInput
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Password"
                      style={styles.input}
                      secureTextEntry
                    />
                    </View>

                    <TouchableOpacity  onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: "black" }]}>
                        <Text style={styles.buttonText}>Sign Up!</Text>
                    </TouchableOpacity>

                  </View>
                )}
              </Formik>
            </SafeAreaView>
          );
    };
    
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
        button: {
            backgroundColor: "#F9A826",
            borderRadius: 50,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10
          },
          buttonText: {
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'bold',
          },
      });

    export default SignUpPage