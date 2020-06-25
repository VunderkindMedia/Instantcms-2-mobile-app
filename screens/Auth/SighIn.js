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
  const { signIn } = useContext(AuthContext);
  const onSubmit = (data) => {
    console.log(data);
    // signIn(data);
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
          "2": {
            title: "Анкета",
            hint: null,
            fields: {
              email: {
                title: "Эл. адрес",
                type: "string",
                name: "email",
                rules: [["required"]],
                options: {
                  is_required: 1,
                  is_digits: null,
                  is_number: 0,
                  is_alphanumeric: null,
                  is_email: null,
                  is_unique: null,
                  is_url: null,
                  disable_drafts: 0,
                  is_date_range_process: "hide",
                  label_in_list: "none",
                  label_in_item: "left",
                  wrap_type: "auto",
                  wrap_width: "",
                  profile_value: "",
                  location_type: "cities",
                  auto_detect: null,
                  location_group: "",
                  output_string: "",
                  author_access: null,
                  parrent_type: "city",
                },
                var_type: "string",
                items: [],
                hint: "Укажите эл. адрес",
                units: null,
                default: null,
              },
              password: {
                title: "Пароль",
                type: "string",
                name: "password",
                rules: [["required"]],
                options: {
                  is_required: 1,
                  is_digits: null,
                  is_number: 0,
                  is_alphanumeric: null,
                  is_email: null,
                  is_unique: null,
                  is_url: null,
                  disable_drafts: 0,
                  is_date_range_process: "hide",
                  label_in_list: "none",
                  label_in_item: "left",
                  wrap_type: "auto",
                  wrap_width: "",
                  profile_value: "",
                  date_title: "Дата рождения",
                  show_y: 1,
                  show_m: null,
                  show_d: null,
                  show_h: null,
                  show_i: null,
                  range: "YEAR",
                  from_date: null,
                  author_access: null,
                },
                var_type: "string",
                items: null,
                hint: null,
                units: null,
                default: null,
              },
            },
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
