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
import { set } from "react-native-reanimated";

export const SignIn = () => {
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  const { settings, reload, theme } = useContext(AppContext);
  const { error } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    // signIn(data);
    signIn(data).then((result) => {
      result && reload();
    });
  };

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
    <View style={styles(theme, settings).signInMainContainer}>
      <VForm
        scrollable={false}
        fields={{
          "2": {
            title: "Анкета",
            hint: null,
            fields: {
              email: {
                title: "Эл. адрес",
                type: "string",
                name: "email",
                rules: [["required"], ["email"]],
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
      >
        <Text style={styles(theme, settings).orTextStyle}>- или -</Text>
        <TouchableOpacity
          style={[
            styles(theme, settings).regBtn,
            { backgroundColor: settings.options.auth_reg_color },
          ]}
          onPress={() => navigation.push("SignUp")}
        >
          <Text style={styles(theme, settings).regBtnTextStyle}>
            {language.register_button_title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme, settings).rememberBtn}
          onPress={() => navigation.push("Remember")}
        >
          <Text style={styles(theme, settings).rememberTextStyle}>
            {language.remember_button_title}
          </Text>
        </TouchableOpacity>
      </VForm>
    </View>
  );
};

const styles = (theme, settings) =>
  StyleSheet.create({
    signInMainContainer: {
      flex: 1,
    },
    forgot: {
      color: "white",
      fontSize: 11,
    },
    regBtn: {
      width: "80%",
      height: 40,
      borderRadius: 15,

      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.24,
      shadowRadius: 2.27,

      elevation: 10,
    },
    orTextStyle: {
      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },
    regBtnTextStyle: {
      color:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
    },
    rememberBtn: {
      marginVertical: 25,
    },
    rememberTextStyle: {
      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },
  });
