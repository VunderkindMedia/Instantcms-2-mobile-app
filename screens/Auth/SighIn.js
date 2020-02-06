import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../../context/app/AppContext";

export const SignIn = ({ navigation, route }) => {
  //   navigation.setOptions({ title: route.label });
  const { settings } = useContext(AppContext);
  setTimeout(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.toggleDrawer()}
          name="ios-menu"
          size={24}
          style={{ marginLeft: 10 }}
          color={settings.options.main_color}
        />
      )
    });
  }, 0);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>
        Здесь будет страница регистрации/Авторизации
      </Text>
    </View>
  );
};
