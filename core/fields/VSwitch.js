import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { AppContext } from "../../context/app/AppContext";
import { onChange } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm, Controller, ErrorMessage } from "react-hook-form";

export const VSwitch = ({
  onChecked,
  title,
  name,
  errorStyle,
  containerStyle,
  switchStyle,
  value,
  labelStyle,
  checkedColor,
  uncheckedColor,
  errors,
  wrapperStyle,
  iconSize,
}) => {
  return (
    <View
      style={[containerStyle, { flex: 1, justifyContent: "space-between" }]}
    >
      <CheckBox
        title={title}
        size={iconSize}
        iconRight
        titleProps={{ ellipsizeMode: "tail", numberOfLines: 2 }}
        containerStyle={switchStyle}
        textStyle={labelStyle}
        wrapperStyle={wrapperStyle}
        checkedColor={checkedColor}
        uncheckedColor={uncheckedColor}
        checked={value}
        onPress={() => {
          onChecked(!value);
        }}
      />
      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <Text style={errorStyle}>{message}</Text>}
      </ErrorMessage>
    </View>
  );
};
