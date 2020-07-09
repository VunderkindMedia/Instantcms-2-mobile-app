import React from "react";
import { TextInput, View, Text } from "react-native";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

export const VTextInput = ({
  style,
  textStyle,
  name,
  placeholderTextColor,
  placeholder,
  errors,
  errorStyle,
  keyboardType,
  onChangeText,
}) => {
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
      <TextInput
        style={textStyle}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <Text style={errorStyle}>{message}</Text>}
      </ErrorMessage>
    </View>
  );
};
