import React from "react";
import { View, Text, Button } from "react-native";

export const Categories = ({ route, navigation }) => {
  navigation.setOptions({ title: "Категории" });
  return (
    <View>
      <Text>{route.params.ctype}</Text>
    </View>
  );
};
