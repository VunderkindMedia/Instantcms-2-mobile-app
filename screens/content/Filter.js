import React from "react";
import { View, Text, Button } from "react-native";

export const Filter = ({ route, navigation }) => {
  navigation.setOptions({ title: "Фильтр" });
  return (
    <View>
      <Text>{route.params.ctype}</Text>
      <Button
        onPress={() =>
          navigation.navigate(route.params.ctype, { ctype: "news" })
        }
        title="фильтровать"
      />
    </View>
  );
};
