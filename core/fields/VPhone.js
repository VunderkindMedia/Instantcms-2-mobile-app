import React, { useState, useEffect } from "react";
import { TextInputMask } from "react-native-masked-text";
import { View } from "react-native";

export const VPhone = ({
  style,
  onChangeValue,
  placeholderTextColor,
  textStyle,
}) => {
  const [value, setValue] = useState();
  useEffect(() => {}, [value]);

  return (
    <View style={style}>
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
    </View>
  );
};
