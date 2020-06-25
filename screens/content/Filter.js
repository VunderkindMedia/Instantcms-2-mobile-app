import React, { useContext } from "react";
import { View, Text, Button, Settings } from "react-native";
import { AppContext } from "../../context/app/AppContext";

export const Filter = ({ route, navigation }) => {
  const { theme, settings } = useContext(AppContext);
  navigation.setOptions({ title: "Фильтр" });
  return (
    <View
      style={{
        marginTop: 50,
        flex: 1,
        padding: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        backgroundColor:
          theme === "dark"
            ? settings.options.dark_mode_color4
            : settings.options.light_mode_color4,
      }}
    >
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
