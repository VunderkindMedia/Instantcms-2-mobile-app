import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../../../context/app/AppContext";

export const Header = () => {
  const { settings } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Ionicons
        size={30}
        name="ios-cog"
        style={[styles.icons, { color: settings.options.main_color }]}
      />
      <View style={styles.userContainer}>
        <Image
          source={{
            uri: "http://f0386604.xsph.ru/upload/default/avatar_micro.png"
          }}
          style={[styles.avatar, { borderColor: settings.options.main_color }]}
        />
        <Text>Вася пупкин</Text>
      </View>
      <Ionicons
        size={30}
        name="ios-log-out"
        style={[styles.icons, { color: settings.options.main_color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: "orange"
  },
  container: {
    marginTop: 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center"
  },
  userContainer: {
    alignItems: "center"
  },
  icons: {}
});
