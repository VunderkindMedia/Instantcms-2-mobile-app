import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  Button,
  Dimensions,
  Image,
} from "react-native";
import Moment from "moment";
import "moment/locale/ru";
import VDropDownPicker from "../fields/VDropDownPicker";
import VImagePicker from "../fields/VImagePicker";
import { AppContext } from "../../context/app/AppContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { VLocationSelector } from "../fields/VLocationSelector";

import { VSwitch } from "../fields/VSwitch";
import { VPhone } from "../fields/VPhone";
import { language } from "../language";
import { VDateTimePicker } from "../fields/VDateTimePicker";

export const VForm = ({ fields, onSubmitForm, submitButtonTitle }) => {
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
                style={[
                  styles(theme, settings).inputView,
                  errors[fields[key]["fields"][field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ]}
                placeholder={fields[key]["fields"][field].title}
                dropDownLabelStyle={{ fontSize: 16 }}
                defaultNull
                animation="fade"
              />

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
              <View
                style={[
                  styles(theme, settings).inputView,
                  errors[fields[key]["fields"][field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ]}
              >
                <Controller
                  as={TextInput}
                  control={control}
                  onChangeText={(value) =>
                    setValue(fields[key]["fields"][field].name, value)
                  }
                  value="dfsdf"
                  keyboardType={
                    fields[key]["fields"][field].type === "number"
                      ? "numeric"
                      : "default"
                  }
                  onChangeName="onChangeText"
                  name={fields[key]["fields"][field].name}
                  style={styles(theme, settings).inputText}
                  placeholderTextColor={
                    theme === "dark"
                      ? settings.options.dark_mode_color5
                      : settings.options.light_mode_color5
                  }
                  placeholder={fields[key]["fields"][field].title}
                  dropDownLabelStyle={{ fontSize: 16 }}
                  defaultValue=""
                />
              </View>
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
            </View>
          );
        } else if (fields[key]["fields"][field].type === "city") {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <Controller
                as={VLocationSelector}
                control={control}
                textInputStyle={[
                  styles(theme, settings).inputView,
                  errors[fields[key]["fields"][field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ]}
                name={fields[key]["fields"][field].name}
                modalStyle={{
                  backgroundColor: settings.options.main_color,
                }}
                style={{
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
                }}
                placeholder="Выбрать город"
                textColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                onChangeName="onChangeValue"
                onChangeValue={(value) => {
                  setValue(fields[key]["fields"][field].name, value, true);
                }}
              />
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
              <Controller
                key={fields[key]["fields"][field].title}
                as={VSwitch}
                control={control}
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
                  setValue(fields[key]["fields"][field].name, val);
                }}
              />
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
            </View>
          );
        } else if (fields[key]["fields"][field].type === "telephone") {
          fields_views.push(
            <View
              key={fields[key]["fields"][field].title}
              style={styles(theme, settings).fieldContainer}
            >
              <Controller
                as={VPhone}
                control={control}
                name={fields[key]["fields"][field].name}
                onChangeName="onChangeValue"
                style={StyleSheet.flatten([
                  styles(theme, settings).inputView,

                  errors[fields[key]["fields"][field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ])}
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
                // name={fields[key]["fields"][field].name + "[date]"}
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
                pickerStyle={{
                  backgroundColor:
                    systemTheme === "dark"
                      ? settings.options.dark_mode_color2
                      : "#fff",
                }}
                locale="ru"
                maximumDate={new Date()}
                placeholder={
                  fields[key]["fields"][field].type === "age"
                    ? language.field_age_name
                    : fields[key]["fields"][field].title
                }
                style={StyleSheet.flatten([
                  styles(theme, settings).inputView,

                  errors[fields[key]["fields"][field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ])}
                // modalStyle={{
                //   backgroundColor:
                //     theme === "dark"
                //       ? settings.options.dark_mode_color2
                //       : settings.options.light_mode_color2,
                // }}
                pickerContainerStyle={{
                  backgroundColor:
                    theme === "dark"
                      ? settings.options.dark_mode_color2
                      : settings.options.light_mode_color2,
                }}
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
            </View>
          );
        } else if (fields[key]["fields"][field].type === "image") {
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
              <VImagePicker
                iconSize={36}
                iconBeforeLoadColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color4
                    : settings.options.light_mode_color4
                }
                textStyle={{
                  marginHorizontal: 10,
                  flex: 1,

                  color:
                    theme === "dark"
                      ? settings.options.dark_mode_color5
                      : settings.options.light_mode_color5,
                }}
                placeholderStyle={{
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
                }}
                styleMainContainer={{
                  flex: 1,

                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                iconColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                imageStyle={{
                  width: 80,
                  height: 80,
                  borderRadius: 15,
                }}
                imageContainer={{
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
                }}
                label={fields[key]["fields"][field].title}
                onSelect={console.log}
              />
              <ErrorMessage
                key={"error" + fields[key]["fields"][field].name}
                errors={errors}
                name={fields[key]["fields"][field].name}
              >
                {({ message }) => (
                  <Text style={styles(theme, settings).errorMessage}>
                    {message}
                  </Text>
                )}
              </ErrorMessage>
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
                iconBeforeLoadColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color4
                    : settings.options.light_mode_color4
                }
                iconSize={30}
                placeholderStyle={{
                  borderWidth: 1,

                  width: 60,
                  height: 60,
                  marginRight: 10,
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
                }}
                styleMainContainer={{
                  flex: 1,

                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                iconColor={
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5
                }
                imageStyle={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                }}
                imageContainer={{
                  width: 60,
                  height: 60,

                  marginRight: 10,
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
                }}
                onSelect={console.log}
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
    let rules = {};
    Object.keys(fields).forEach((key) => {
      Object.keys(fields[key]["fields"]).forEach((field) => {
        if (fields_types.includes(fields[key]["fields"][field].type)) {
          if (
            ["rules"] in fields[key]["fields"][field] &&
            fields[key]["fields"][field]["rules"].length > 0
          ) {
            fields[key]["fields"][field]["rules"].map(function (rule) {
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
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "dark"
            ? settings.options.dark_mode_color4
            : settings.options.light_mode_color4,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {fields ? fieldset : childrens}
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (theme, settings) =>
  StyleSheet.create({
    // pickerView: {
    //   borderRadius: 25,
    //   height: 30,

    //   marginBottom: 5,
    //   justifyContent: "center",
    // },

    fieldContainer: {
      flex: 1,
      width: "90%",

      // paddingHorizontal: 20,
      backgroundColor: "transparent",
    },

    inputView: {
      flex: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0.5,
      // borderRadius: 50,

      backgroundColor:
        theme === "dark"
          ? settings.options.dark_mode_color2
          : settings.options.light_mode_color2,
      // borderBottomWidth: 0.5,
      borderBottomColor:
        theme === "dark"
          ? settings.options.dark_mode_color5
          : settings.options.light_mode_color5,

      marginBottom: 5,
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 0,
      // },
      // shadowOpacity: 0.24,
      // shadowRadius: 2.27,

      // elevation: 10,
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
      paddingLeft: 20,
      width: "80%",
      alignItems: "center",
      fontSize: 12,
      marginBottom: 7,
    },
    submitBtn: {
      width: "80%",

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

      // borderTopWidth: 0.3,
      // borderTopColor:
      //   theme === "dark"
      //     ? settings.options.dark_mode_color5
      //     : settings.options.light_mode_color5,
    },
  });
