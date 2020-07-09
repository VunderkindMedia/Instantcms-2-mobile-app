import React, { useEffect } from "react";
import { View, Text } from "react-native";

export const Dots = ({ level, style }) => {
  let dots = [];

  for (var i = 0; i < level; i++) {
    dots.push(
      <Text style={{ color: "#fff" }} key={i}>
        {"•"}
      </Text>
    );
  }

  return (
    <View
      style={[
        style,
        {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 5,
        },
      ]}
    >
      {dots}
    </View>
  );
};
