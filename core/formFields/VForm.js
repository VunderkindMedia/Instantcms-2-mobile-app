import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Moment from "moment";
import "moment/locale/ru";
import VDropDownPicker from "../fields/VDropDownPicker";
import VImagePicker from "../fields/VImagePicker";
import { AppContext } from "../../context/app/AppContext";
import { AuthContext } from "../../context/auth/AuthContext";

import { VLocationSelector } from "../fields/VLocationSelector";
import { VTextInput } from "../fields/VTextInput";
import { VSwitch } from "../fields/VSwitch";
import { VPhone } from "../fields/VPhone";
import { language } from "../language";
import { VDateTimePicker } from "../fields/VDateTimePicker";

export const VForm = ({
  fields,
  onSubmitForm,
  submitButtonTitle,
  scrollable,
  children,
}) => {
  const { settings, theme, systemTheme } = useContext(AppContext);

  const { loading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    getValues,
    watch,
  } = useForm();
  let fieldset = [];
  function fieldsView(key) {
    let fields_views = [];
    Object.keys(fields[key]["fields"]).forEach((field) => {
      if (fields[key]["fields"][field].name !== "csrf_token") {
        if (fields[key]["fields"][field].type === "list") {
          let list_values = [];

          Object.keys(fields[key]["fields"][field].items).map(function (
            objectKey,
            index
          ) {
            list_values.push({
              label: fields[key]["fields"][field].items[objectKey],
              value: objectKey,
            });
          });
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <Controller
                as={VDropDownPicker}
                control={control}
                labelStyle={{
                  color:
                    theme === "dark"
                      ? settings.options.dark_mode_color5
                      : settings.options.light_mode_color5,
                }}
                onChangeItem={(item) =>
                  setValue(fields[key]["fields"][field].name, item.value, true)
                }
                name={fields[key]["fields"][field].name}
                items={list_values}
                errors={errors}
                errorStyle={styles(theme, settings).errorMessage}
                style={styles(theme, settings).inputView}
                placeholder={fields[key]["fields"][field].title}
                dropDownLabelStyle={{ fontSize: 16 }}
                defaultNull
                animation="fade"
              />
            </View>
          );
        } else if (
          fields[key]["fields"][field].type === "string" ||
          fields[key]["fields"][field].type === "number"
        ) {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <VTextInput
                errors={errors}
                textStyle={styles(theme, settings).inputText}
                onChangeText={(value) =>
                  setValue(fields[key]["fields"][field].name, value, true)
                }
                value="dfsdf"
                keyboardType={
                  fields[key]["fields"][field].type === "number"
                    ? "numeric"
                    : "default"
                }
                name={fields[key]["fields"][field].name}
                style={styles(theme, settings).inputView}
                placeholderTextColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                errorStyle={styles(theme, settings).errorMessage}
                placeholder={fields[key]["fields"][field].title}
              />
            </View>
          );
        } else if (fields[key]["fields"][field].type === "city") {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <VLocationSelector
                textInputStyle={styles(theme, settings).inputView}
                errors={errors}
                errorStyle={styles(theme, settings).errorMessage}
                name={fields[key]["fields"][field].name}
                modalStyle={styles(theme, settings).cityModalStyle}
                style={styles(theme, settings).cityFieldStyle}
                placeholder="Выбрать город"
                textColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                onChangeValue={(value) => {
                  setValue(fields[key]["fields"][field].name, value, true);
                }}
              />
            </View>
          );
        } else if (
          fields[key]["fields"][field].type === "rules" ||
          fields[key]["fields"][field].type === "checkbox"
        ) {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <VSwitch
                key={fields[key]["fields"][field].title}
                errors={errors}
                errorStyle={styles(theme, settings).errorMessage}
                name={fields[key]["fields"][field].name}
                title={fields[key]["fields"][field].title}
                switchStyle={styles(theme, settings).switch}
                wrapperStyle={styles(theme, settings).wrapperSwitchStyle}
                checkedColor={settings.options.main_color}
                uncheckedColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                containerStyle={[
                  styles(theme, settings).inputView,
                  // =++++++++++++++++=
                  errors[fields[key]["fields"][field].name] && {
                    borderColor: "red",
                    borderWidth: 0,
                    borderLeftWidth: 5,
                  },
                ]}
                onChangeName="onChecked"
                labelStyle={styles(theme, settings).switchLabelStyle}
                value={Boolean(watch(fields[key]["fields"][field].name))}
                onChecked={(val) => {
                  console.log("val");
                  setValue(fields[key]["fields"][field].name, val, true);
                }}
              />
            </View>
          );
        } else if (fields[key]["fields"][field].type === "telephone") {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <VPhone
                name={fields[key]["fields"][field].name}
                errorStyle={styles(theme, settings).errorMessage}
                errors={errors}
                style={styles(theme, settings).inputView}
                textStyle={styles(theme, settings).inputText}
                placeholderTextColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                onChangeValue={(text) => {
                  setValue(
                    fields[key]["fields"][field].name,
                    String(text),
                    true
                  );
                }}
              />
            </View>
          );
        } else if (
          fields[key]["fields"][field].type === "age" ||
          fields[key]["fields"][field].type === "date"
        ) {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <VDateTimePicker
                errors={errors}
                errorStyle={styles(theme, settings).errorMessage}
                name={fields[key]["fields"][field].name}
                cancelBtnTextColor={settings.options.main_color}
                confirmBtnTextColor={settings.options.main_color}
                onChangeValue={(text) => {
                  setValue(
                    fields[key]["fields"][field].name + "[date]",
                    Moment(text).format("L")
                  );
                  setValue(
                    fields[key]["fields"][field].name + "[hours]",
                    Moment(text).format("HH")
                  );
                  setValue(
                    fields[key]["fields"][field].name + "[mins]",
                    Moment(text).format("mm")
                  );
                }}
                mode="date"
                pickerStyle={
                  styles(theme, settings, systemTheme).datePickerStyle
                }
                locale="ru"
                maximumDate={new Date()}
                placeholder={
                  fields[key]["fields"][field].type === "age"
                    ? language.field_age_name
                    : fields[key]["fields"][field].title
                }
                style={styles(theme, settings).inputView}
                pickerContainerStyle={
                  styles(theme, settings).pickerContainerStyle
                }
                buttonStyle={[
                  styles(theme, settings).submitBtn,
                  { backgroundColor: settings.options.auth_submit_color },
                ]}
                textStyle={{
                  color:
                    theme === "dark"
                      ? settings.options.dark_mode_color5
                      : settings.options.light_mode_color5,
                }}
                backgroundCancelBtn={
                  theme === "dark"
                    ? settings.options.dark_mode_color2
                    : settings.options.light_mode_color2
                }
              />
            </View>
          );
        } else if (fields[key]["fields"][field].type === "image") {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].name}
              style={styles(theme, settings).fieldContainer}
            >
              <Text style={styles(theme, settings).imagePickerLabelStyle}>
                {fields[key]["fields"][field].title}
              </Text>
              <VImagePicker
                errors={errors}
                name={fields[key]["fields"][field].name}
                iconSize={36}
                iconBeforeLoadColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color4
                    : settings.options.light_mode_color4
                }
                textStyle={styles(theme, settings).imagePickerTextStyle}
                placeholderStyle={
                  styles(theme, settings).imagePickerPlaceholderStyle
                }
                styleMainContainer={
                  styles(theme, settings).imagePickerMainContainerStyle
                }
                iconColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                imageStyle={styles(theme, settings).imagePickerImageStyle}
                imageContainer={
                  styles(theme, settings).imagePickerImageContainerStyle
                }
                onSelect={(data) =>
                  setValue(fields[key]["fields"][field].name, data)
                }
              />
            </View>
          );
        } else if (fields[key]["fields"][field].type === "images") {
          let images_views = [];

          for (
            let i = 0;
            i < fields[key]["fields"][field].options.max_photos;
            i++
          ) {
            images_views.push(
              <VImagePicker
                key={fields[key]["fields"][field].title + i}
                errors={errors}
                name={fields[key]["fields"][field].name}
                iconBeforeLoadColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color4
                    : settings.options.light_mode_color4
                }
                iconSize={30}
                placeholderStyle={[
                  styles(theme, settings).imagePickerPlaceholderStyle,
                  { width: 60, height: 60, marginRight: 10 },
                ]}
                styleMainContainer={
                  styles(theme, settings).imagePickerMainContainerStyle
                }
                iconColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                imageStyle={styles(theme, settings).imagesSetImageStyle}
                imageContainer={[
                  styles(theme, settings).imagePickerImageContainerStyle,
                  { width: 60, height: 60 },
                ]}
                onSelect={(data) =>
                  setValue(fields[key]["fields"][field].name, data)
                }
              />
            );
          }

          fields_views.push(
            <View
              key={fields[key]["fields"][field].name}
              style={styles(theme, settings).fieldContainer}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  flex: 1,

                  color:
                    theme === "dark"
                      ? settings.options.dark_mode_color5
                      : settings.options.light_mode_color5,
                }}
              >
                {fields[key]["fields"][field].title}
              </Text>
              <ScrollView style={{}} horizontal={true}>
                {images_views}

                <ErrorMessage
                  errors={errors}
                  name={fields[key]["fields"][field].name}
                >
                  {({ message }) => (
                    <Text style={styles(theme, settings).errorMessage}>
                      {message}
                    </Text>
                  )}
                </ErrorMessage>
              </ScrollView>
            </View>
          );
        }
      }
    });
    return fields_views;
  }

  const fields_types = [
    "string",
    "list",
    "email",
    "rules",
    "city",
    "telephone",
    "age",
    "checkbox",
    "date",
    "images",
    "image",
  ];

  useEffect(() => {
    Object.keys(fields).forEach((key) => {
      Object.keys(fields[key]["fields"]).forEach((field) => {
        let rules = {};
        if (fields_types.includes(fields[key]["fields"][field].type)) {
          if (
            ["rules"] in fields[key]["fields"][field] &&
            fields[key]["fields"][field]["rules"].length > 0
          ) {
            fields[key]["fields"][field]["rules"].map(function (rule) {
              console.log(field, rule[0]);
              if (rule[0] === "required") {
                rules = { ...rules, required: language.field_error_required };
              }
              if (rule[0] === "max_length") {
                rules = {
                  ...rules,
                  maxLength: {
                    value: rule[1],
                    message: language.field_error_max_length + rule[1],
                  },
                };
              }
              if (rule[0] === "min_length") {
                rules = {
                  ...rules,
                  minLength: {
                    value: rule[1],
                    message: language.field_error_min_length + rule[1],
                  },
                };
              }
              if (rule[0] === "email") {
                rules = {
                  ...rules,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: language.field_error_email,
                  },
                };
              }
            });
          }
        }
        if (fields_types.includes(fields[key]["fields"][field].type)) {
          if (
            fields[key]["fields"][field].type === "age" ||
            fields[key]["fields"][field].type === "date"
          ) {
            register(
              { name: fields[key]["fields"][field].name + "[date]" },
              rules
            );
            register(
              { name: fields[key]["fields"][field].name + "[hours]" },
              rules
            );
            register(
              { name: fields[key]["fields"][field].name + "[mins]" },
              rules
            );
          } else {
            console.log(rules);
            register({ name: fields[key]["fields"][field].name }, rules);
          }
        }
      });
    });
  }, [register]);

  useEffect(() => {
    console.log("RULES", getValues("rules"));
  }, [errors]);

  fields &&
    Object.keys(fields).forEach((key) => {
      if (key !== "csrf_token") {
        fieldset.push(
          <View key={key} style={styles(theme, settings).fieldsetView}>
            {fieldsView(key)}
          </View>
        );
      }
    });

  return (
    <View style={styles(theme, settings).mainViewStyle}>
      <ScrollView
        scrollEnabled={scrollable}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {fields && fieldset}
        <View style={styles(theme, settings).fieldsetView}>
          <TouchableOpacity
            style={[
              styles(theme, settings).submitBtn,
              { backgroundColor: settings.options.auth_submit_color },
            ]}
            onPress={handleSubmit(onSubmitForm)}
          >
            {!loading && (
              <Text style={styles(theme, settings).submitText}>
                {submitButtonTitle}
              </Text>
            )}
            {loading && (
              <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
            )}
          </TouchableOpacity>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (theme, settings, systemTheme) =>
  StyleSheet.create({
    mainViewStyle: {
      flex: 1,
      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color4
          : settings.options.light_mode_color4,
    },
    scrollViewStyle: {
      flexGrow: 1,
      flex: 1,
    },

    fieldContainer: {
      flex: 1,
      width: "90%",

      // paddingHorizontal: 20,
      backgroundColor: "transparent",
    },

    inputView: {
      flex: 1,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
      borderBottomWidth: 0.5,
      borderBottomColor:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,

      marginBottom: 5,
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    switch: {
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
      borderBottomColor:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,
    },
    inputText: {
      marginLeft: 5,
      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },

    wrapperSwitchStyle: {
      justifyContent: "space-between",
    },
    switchLabelStyle: {
      flex: 1,
      fontWeight: "normal",
      marginLeft: 5,

      color:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,
    },
    switchContainer: {
      flex: 1,

      margin: 0,
      marginLeft: 0,
      marginRight: 0,
      padding: 0,
    },
    errorMessage: {
      color: "red",
      paddingLeft: 5,
      marginTop: 5,
      width: "80%",
      alignItems: "center",
      fontSize: 12,
      marginBottom: 5,
    },
    submitBtn: {
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
    submitText: {
      color: "#fff",
    },

    fieldsetView: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
      marginHorizontal: 10,
      paddingVertical: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.24,
      shadowRadius: 2.27,

      elevation: 10,
      borderRadius: 15,
      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
    },
    cityFieldStyle: {
      height: 50,
      backgroundColor: "#ccc",
      borderWidth: 1,
      width: "80%",
      alignItems: "center",
      margin: 10,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.24,
      shadowRadius: 2.27,

      elevation: 10,
    },

    cityModalStyle: {
      backgroundColor: settings.options.main_color,
    },

    datePickerStyle: {
      backgroundColor:
        systemTheme === "dark" ? settings.options.dark_mode_color2 : "#fff",
    },

    pickerContainerStyle: {
      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
    },
    imagePickerTextStyle: {
      marginHorizontal: 10,
      flex: 1,

      color:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,
    },

    imagePickerPlaceholderStyle: {
      borderWidth: 1,

      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color4,
      borderColor:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.24,
      shadowRadius: 2.27,

      elevation: 15,
    },

    imagePickerMainContainerStyle: {
      flex: 1,
      marginVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    imagePickerImageStyle: {
      width: 80,
      height: 80,
      borderRadius: 15,
    },
    imagesSetImageStyle: {
      width: 60,
      height: 60,
      borderRadius: 15,
    },
    imagePickerImageContainerStyle: {
      width: 80,
      height: 80,
      borderRadius: 15,
      borderColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
      backgroundColor: settings.options.main_color,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.24,
      shadowRadius: 2.27,
      elevation: 10,
    },
    imagePickerLabelStyle: {
      marginHorizontal: 10,
      flex: 1,
      color:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,
    },
  });
