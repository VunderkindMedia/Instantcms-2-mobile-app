import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { AppContext } from "../../context/app/AppContext";
import { onChange } from "react-native-reanimated";

export const VSwitch = ({
  onChecked,
  title,
  containerStyle,

  labelStyle,
}) => {
  const [checked, setChecked] = useState();
  useEffect(() => {
    onChecked(checked);
  }, [checked]);
  const { settings } = useContext(AppContext);

  return (
    <CheckBox
      title={title}
      iconRight
      //component = { () => {return <TouchableOpacity></TouchableOpacity>}}
      containerStyle={containerStyle}
      textStyle={labelStyle}
      checkedColor={settings.options.main_color}
      checked={checked}
      onPress={() => {
        setChecked(!checked);
      }}
    />
  );
};
