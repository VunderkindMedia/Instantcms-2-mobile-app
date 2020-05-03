import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Toggler } from "../../navigation/components/childs/Toggler"
import { AppContext } from "../../context/app/AppContext";

export const Settings = ({ navigation }) => {


  Toggler(navigation);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ margin: 10, textAlign: "center" }}>
        Здесь будут локальные настройки приложения
      </Text>
    </View>
  );
};
