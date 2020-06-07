import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Toggler } from "../../navigation/components/childs/Toggler";
import { AppContext } from "../../context/app/AppContext";
import { Switch } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

export const Settings = ({ navigation }) => {
  const { setTheme, theme } = useContext(AppContext);

  Toggler(navigation);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={theme === "dark" ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
        value={theme === "dark"}
      />
    </View>
  );
};
