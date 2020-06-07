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
} from "react-native";
import VDropDownPicker from "../fields/VDropDownPicker";
import { AppContext } from "../../context/app/AppContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { TextInput } from "react-native-gesture-handler";
import { VLocationSelector } from "../fields/VLocationSelector";

import { VSwitch } from "../fields/VSwitch";
import { VPhone } from "../fields/VPhone";
import { language } from "../language";
import { VDateTimePicker } from "../fields/VDateTimePicker";

export const VForm = ({ fields, onSubmitForm, submitButtonTitle }) => {
  const { settings } = useContext(AppContext);
  const { loading } = useContext(AuthContext);
  const { register, handleSubmit, errors, setValue, control } = useForm();
  let fields_from_object = [];

  const fields_types = ["string", "list", "rules", "city", "telephone", "age"];

  useEffect(() => {
    Object.keys(fields).map(function (field) {
      let rules = {};
      if (fields_types.includes(fields[field].type)) {
        if (["rules"] in fields[field] && fields[field]["rules"].length > 0) {
          fields[field]["rules"].map(function (rule) {
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

      if (fields_types.includes(fields[field].type)) {
        register({ name: fields[field].name }, rules);
      }
    });
  }, [register]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  {
    fields &&
      Object.keys(fields).map(function (field) {
        if (fields[field].type === "list") {
          let list_values = [];

          Object.keys(fields[field].items).map(function (objectKey, index) {
            list_values.push({
              label: fields[field].items[objectKey],
              value: objectKey,
            });
          });

          fields_from_object.push(
            <View key={fields[field].title} style={styles.fieldContainer}>
              <Controller
                as={VDropDownPicker}
                control={control}
                onChangeItem={(item) =>
                  setValue(fields[field].name, item.value, true)
                }
                name={fields[field].name}
                items={list_values}
                style={[
                  styles.inputView,
                  errors[fields[field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ]}
                placeholder={fields[field].title}
                dropDownLabelStyle={{ fontSize: 16 }}
                defaultNull
                animation="fade"
              />

              <ErrorMessage errors={errors} name={fields[field].name}>
                {({ message }) => (
                  <Text style={styles.errorMessage}>{message}</Text>
                )}
              </ErrorMessage>
            </View>
          );
        } else if (fields[field].type === "string") {
          fields_from_object.push(
            <View key={fields[field].title} style={styles.fieldContainer}>
              <View
                style={[
                  styles.inputView,
                  errors[fields[field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ]}
              >
                <Controller
                  as={TextInput}
                  control={control}
                  onChangeText={(value) => setValue(fields[field].name, value)}
                  value="dfsdf"
                  onChangeName="onChangeText"
                  name={fields[field].name}
                  style={styles.inputText}
                  placeholder={fields[field].title}
                  dropDownLabelStyle={{ fontSize: 16 }}
                  defaultValue=""
                />
              </View>
              <ErrorMessage errors={errors} name={fields[field].name}>
                {({ message }) => (
                  <Text style={styles.errorMessage}>{message}</Text>
                )}
              </ErrorMessage>
            </View>
          );
        } else if (fields[field].type === "city") {
          fields_from_object.push(
            <View key={fields[field].title} style={styles.fieldContainer}>
              <Controller
                as={VLocationSelector}
                control={control}
                textInputStyle={[
                  styles.inputView,
                  errors[fields[field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ]}
                name={fields[field].name}
                modalStyle={{ backgroundColor: settings.options.main_color }}
                style={styles.inputView}
                placeholder="Выбрать город"
                onChangeName="onChangeValue"
                onChangeValue={(value) => {
                  setValue(fields[field].name, value, true);
                }}
              />
              <ErrorMessage errors={errors} name={fields[field].name}>
                {({ message }) => (
                  <Text style={styles.errorMessage}>{message}</Text>
                )}
              </ErrorMessage>
            </View>
          );
        } else if (fields[field].type === "rules") {
          fields_from_object.push(
            <View key={fields[field].title} style={styles.fieldContainer}>
              <Controller
                key={fields[field].title}
                as={VSwitch}
                control={control}
                name={fields[field].name}
                title={fields[field].title}
                switchStyle={styles.switch}
                containerStyle={StyleSheet.flatten([
                  styles.inputView,
                  styles.switchContainer,
                  errors[fields[field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ])}
                onChangeName="onChecked"
                labelStyle={styles.switchLabelStyle}
                onChecked={(value) => setValue(fields[field].name, value)}
              />
            </View>
          );
        } else if (fields[field].type === "telephone") {
          fields_from_object.push(
            <View key={fields[field].title} style={styles.fieldContainer}>
              <Controller
                as={VPhone}
                control={control}
                name={fields[field].name}
                onChangeName="onChangeValue"
                style={StyleSheet.flatten([
                  styles.inputView,

                  errors[fields[field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ])}
                onChangeValue={(text) => {
                  setValue(fields[field].name, String(text), true);
                }}
              />
              <ErrorMessage errors={errors} name={fields[field].name}>
                {({ message }) => (
                  <Text style={styles.errorMessage}>{message}</Text>
                )}
              </ErrorMessage>
            </View>
          );
        } else if (fields[field].type === "age") {
          fields_from_object.push(
            <View key={fields[field].title} style={styles.fieldContainer}>
              <Controller
                as={VDateTimePicker}
                control={control}
                name={fields[field].name}
                onChangeName="onChangeValue"
                mode="date"
                onChangeValue={(text) => {
                  setValue(fields[field].name, String(text), true);
                }}
                placeholder={"Дата рождения"}
                style={StyleSheet.flatten([
                  styles.inputView,

                  errors[fields[field].name] && {
                    borderColor: "red",
                    borderLeftWidth: 5,
                  },
                ])}
                buttonStyle={[
                  styles.submitBtn,
                  { backgroundColor: settings.options.auth_submit_color },
                ]}
                textStyle={{ color: "#000" }}
              />
              <ErrorMessage errors={errors} name={fields[field].name}>
                {({ message }) => (
                  <Text style={styles.errorMessage}>{message}</Text>
                )}
              </ErrorMessage>
            </View>
          );
        }
      });
  }
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {fields ? fields_from_object : childrens}
      <TouchableOpacity
        style={[
          styles.submitBtn,
          { backgroundColor: settings.options.auth_submit_color },
        ]}
        onPress={handleSubmit(onSubmitForm)}
      >
        {!loading && <Text style={styles.submitText}>{submitButtonTitle}</Text>}
        {loading && (
          <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerView: {
    borderRadius: 25,
    height: 30,

    marginBottom: 5,
    justifyContent: "center",
  },

  fieldContainer: {
    width: "100%",
  },

  inputView: {
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "#E7E7E7",
    borderColor: "#E7E7E7",
    height: 50,
    marginBottom: 5,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  switchLabelStyle: {
    fontWeight: "normal",
    flex: 1,
  },
  switchContainer: {
    marginLeft: 0,
    marginTop: 0,
  },
  errorMessage: {
    color: "red",
    paddingLeft: 20,
    width: "80%",
    alignItems: "center",
    fontSize: 12,
    marginBottom: 15,
  },
  submitBtn: {
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
  submitText: {
    color: "white",
  },
});
