import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Keyboard,
  Easing,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
} from "react-native";
import { AppContext } from "../../context/app/AppContext";
import { VForm } from "../../core/formFields/VForm";

import { AuthContext } from "../../context/auth/AuthContext";
import { ScrollView } from "react-native-gesture-handler";

export const SignUp = () => {
  const { settings } = useContext(AppContext);

  const {
    signUpLoading,
    getFieldsLoading,
    getSignFields,
    sign_fields,
    setSignUpRequestData,
    signUpRequestData,
  } = useContext(AuthContext);

  const [animation] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      easing: Easing.bounce,
      duration: 1500,
    }).start();
    // Animated.timing(animation, {
    //   toValue: 1,
    //   easing: Easing.linear,
    //   duration: 1000,
    // }).start();
  }, [getFieldsLoading]);

  const size = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-155, 0],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    getSignFields().then((data) => {
      console.log(sign_fields);
    });
  }, []);

  let fields_components = [];
  {
    Object.keys(sign_fields).map(function (field) {
      // if (sign_fields[field].type !== "rules") {
      fields_components.push(
        <FormField
          key={sign_fields[field].name}
          field={sign_fields[field]}
          onChangeValue={(item, name) => {
            setSignUpRequestData({ [name]: item });
          }}
        />
      );
      // }
    });
  }

  if (getFieldsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: settings.options.main_color },
          ]}
        >
          <KeyboardAvoidingView
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              width: "100%",
            }}
            behavior={Platform.IOS ? "padding" : "height"}
            keyboardVerticalOffset={150}
          >
            <Animated.View
              style={[
                styles.mainView,
                {
                  marginTop: size,
                  opacity: animation,
                },
              ]}
            >
              <Animated.Image
                style={[styles.regLogo, { transform: [{ rotate: rotate }] }]}
                source={require("../../assets/reg_logo.png")}
              ></Animated.Image>

              <ScrollView style={{ width: "100%" }}>
                {fields_components}
              </ScrollView>
            </Animated.View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={[
              styles.loginBtn,
              {
                backgroundColor: settings.options.auth_submit_color,
                opacity: animation,
              },
            ]}
            onPress={() => {
              console.log(signUpRequestData);
            }}
          >
            {!signUpLoading && (
              <Text style={styles.loginText}>РЕГИСТРАЦИЯ</Text>
            )}
            {signUpLoading && (
              <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  inputView: {
    width: "80%",
    backgroundColor: "grey",
    opacity: 0.5,
    borderRadius: 25,
    height: 40,
    marginBottom: 5,
    justifyContent: "center",
    padding: 20,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#27ae60",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  mainView: {
    backgroundColor: "#fff",

    width: "90%",
    borderRadius: 10,
    padding: 10,
    paddingTop: 50,
  },
  regLogo: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 50,
    position: "absolute",
    top: -40,
    left: "40%",
    zIndex: 5000,
  },
});
