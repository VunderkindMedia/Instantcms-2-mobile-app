import React, { useState, useEffect } from "react";
import { TextInputMask } from "react-native-masked-text";
import { View, Text } from "react-native";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

export const VPhone = ({
  style,
  onChangeValue,
  placeholderTextColor,
  textStyle,
  errors,
  errorStyle,
  name,
}) => {
  const [value, setValue] = useState();
  useEffect(() => {}, [value]);

  return (
    <View
      style={[
        style,
        errors[name] && {
          borderColor: "red",
          borderLeftWidth: 5,
        },
      ]}
    >
      <TextInputMask
        type={"cel-phone"}
        options={{
          maskType: "BRL",
          withDDD: true,
          dddMask: "+7 (999)-999-99-99",
        }}
        value={value}
        placeholder={"Телефон: +7 (999)-999-99-99"}
        onChangeText={(text) => {
          if (text.length <= 18) {
            onChangeValue(text.replace(/[^+\d]/g, ""));
            setValue(text);
          }
        }}
        placeholderTextColor={placeholderTextColor}
        style={[
          textStyle,
          {
            flex: 1,
            width: "100%",
          },
        ]}
      />
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <Text style={errorStyle}>{message}</Text>}
      </ErrorMessage>
    </View>
  );
};
