import React, { useContext, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Text,
  Button,
  ToastAndroid,
  Alert,
  Platform,
} from "react-native";

import { Toggler } from "../../navigation/components/childs/Toggler";
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/app/AppContext";
import { VForm } from "../../core/formFields/VForm";
import { language } from "../../core/language";

export const SignIn = () => {
  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log(data);
    // signIn(email, password).then((result) => {
    //   result && reload();
    // });
  };

  const { settings, reload } = useContext(AppContext);
  const { error } = useContext(AuthContext);

  Toggler(navigation);

  useEffect(() => {
    if (error) {
      if (Platform.OS === "android") {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      } else {
        Alert.alert(error);
      }
    }
  }, [error]);

  return (
    <View style={styles.signInMainContainer}>
      <VForm
        fields={{
          list: {
            type: "list",
            title: "List",
            rules: [["required"]],
            items: {
              "4": "Пользователи",
            },
            name: "list",
          },
          string: {
            type: "string",
            title: "Textd",
            rules: [["required"], ["min_length", 6], ["max_length", 72]],
            name: "text",
          },
          city: {
            title: "Город",
            type: "city",
            name: "city",
            rules: [["required"]],
            var_type: "integer",
            items: [],
            hint: "Укажите город, в котором вы живете",
            units: null,
            default: null,
          },
          telephon: {
            title: "Телефон",
            type: "telephone",
            name: "telephon",
            rules: [["required"]],
            var_type: "string",
            items: null,
            hint: null,
            units: null,
            default: null,
          },
          birth_date: {
            title: "Возраст",
            type: "age",
            name: "birth_date",
            rules: [["required"], ["date"]],
            var_type: "string",
            items: null,
            hint: null,
            units: null,
            default: null,
          },
          rules: {
            title: "С правилами сайта согласен",
            type: "rules",
            name: "rules",
            rules: [["required"]],
            var_type: "integer",
            items: null,
            hint: null,
            units: null,
            default: null,
          },
        }}
        onSubmitForm={onSubmit}
        submitButtonTitle={language.submit_button_title}
      />

      <TouchableOpacity onPress={() => navigation.push("SignUp")}>
        <Text style={styles.loginText}>{language.register_button_title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signInMainContainer: {
    flex: 1,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
});
