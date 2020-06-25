import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { AppContext } from "../../context/app/AppContext";
import { onChange } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

export const VSwitch = ({
  onChecked,
  title,
  containerStyle,
  value,
  labelStyle,
  checkedColor,
  uncheckedColor,
  defaultValue,
  wrapperStyle,
  iconSize,
}) => {
  const { settings } = useContext(AppContext);

  return (
    <CheckBox
      title={title}
      size={iconSize}
      iconRight
      titleProps={{ ellipsizeMode: "tail", numberOfLines: 2 }}
      //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
      containerStyle={[
        containerStyle,
        { flex: 1, justifyContent: "space-between" },
      ]}
      textStyle={labelStyle}
      wrapperStyle={wrapperStyle}
      checkedColor={checkedColor}
      uncheckedColor={uncheckedColor}
      checked={value}
      onPress={() => {
        onChecked(!value);
      }}
    />
  );
};
