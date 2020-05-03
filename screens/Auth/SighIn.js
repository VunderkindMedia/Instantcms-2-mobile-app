import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";
import { Toggler } from "../../navigation/components/childs/Toggler";
import { AppContext } from "../../context/app/AppContext";

export const SignIn = ({ navigation, route }) => {
  //   navigation.setOptions({ title: route.label });
  const { settings, signIn, sign_in_loading, isAuth, setAuth } = useContext(
    AppContext
  );
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  Toggler(navigation);

  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  }

  validateEmail = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmailValid(false);
      return false;
    } else {
      setEmailValid(true);
      console.log("Email is Correct");
      return true;
    }
  };

  validatePassword = (text) => {
    if (text.length < 6) {
      console.log("Password is Not Correct");
      setPasswordValid(false);
      return false;
    } else {
      setPasswordValid(true);
      console.log("Password is Correct");
      return true;
    }
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: settings.options.main_color },
      ]}
    >
      <Text style={styles.logo}>InstantCMS 2</Text>
      <View
        style={[
          styles.inputView,
          !emailValid
            ? { borderColor: "red", borderBottomWidth: 3 }
            : { marginBottom: 20 },
        ]}
      >
        <TextInput
          style={styles.inputText}
          placeholder="test@testuser.ru"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => {
            setEmail(email);
            validateEmail(email);
          }}
        />
      </View>
      {!emailValid && (
        <Text style={styles.validateText}>
          Почтовый адрес не введен или имеет неверный формат!
        </Text>
      )}
      <View
        style={[
          styles.inputView,
          !passwordValid && { borderColor: "red", borderBottomWidth: 3 },
        ]}
      >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="test123"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => {
            setPassword(password);
            validatePassword(password);
          }}
        />
      </View>
      {!passwordValid && (
        <Text style={styles.validateText}>Пароль менее 6 символов!</Text>
      )}
      <TouchableOpacity>
        <Text style={styles.forgot}>Забыли пароль?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          signIn(email, password).then((result) => {
            if (result.error) {
              if (result.error.request_params.email) {
                notifyMessage(result.error.request_params.email);
              } else {
                notifyMessage(result.error.error_msg);
              }
              // result.error && (result.error.error_msg && !result.error.request_params.email ? notifyMessage(result.error.error_msg) : (result.error.request_params.email && notifyMessage(result.error.request_params.email)))
            } else if (result.response) {
              setAuth(!isAuth);
            }
          });
        }}
      >
        {!sign_in_loading && <Text style={styles.loginText}>ВОЙТИ</Text>}
        {sign_in_loading && (
          <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("SignUp")}>
        <Text style={styles.loginText}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#27ae60",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#27ae60",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  validateText: {
    color: "red",
    paddingLeft: 20,
    width: "80%",
    alignItems: "center",
    fontSize: 12,
    marginBottom: 15,
  },
});
