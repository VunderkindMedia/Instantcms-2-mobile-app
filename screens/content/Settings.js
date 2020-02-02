import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../../context/app/AppContext";

export const Settings = ({ navigation }) => {
  const { settings } = useContext(AppContext);
  navigation.setOptions({
    headerLeft: () => (
      <Ionicons
        onPress={() => navigation.toggleDrawer()}
        name="ios-menu"
        size={20}
        style={{ marginLeft: 10 }}
        color={settings.options.main_color}
      />
    )
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Настройки</Text>
    </View>
  );
};
