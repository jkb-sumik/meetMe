import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../components/PageContainer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import colors from "../constants/colors";

import logo from "../assets/images/logo.png";

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              {/*<Image style={styles.image} source={logo} resizeMode="contain" />*/}
              <Text style={styles.textLogo}>MeetMe</Text>
            </View>

            <View
              style={{
                backgroundColor: "#dfdfdf",
                padding: 20,
                borderRadius: 20,
              }}
            >
              {isSignUp ? <SignUpForm /> : <SignInForm />}

              <TouchableOpacity
                onPress={() => setIsSignUp((prevState) => !prevState)}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>{`Switch to ${
                  isSignUp ? "sign in" : "sign up"
                }`}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: colors.primary100,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
  imageContainer: {
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
  },
  textLogo: {
    fontSize: 40,
    fontFamily: "bold",
    color: colors.primary500,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AuthScreen;
