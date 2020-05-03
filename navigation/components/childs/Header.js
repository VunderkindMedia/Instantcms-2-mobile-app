import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../../../context/app/AppContext";

export const Header = () => {
  const { settings, logout, setAuth, isAuth } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {settings.user_info.date_log && (
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              size={30}
              name="ios-cog"
              style={[styles.icons, { color: settings.options.main_color }]}
            />
          </TouchableOpacity>
        )}

        <Image
          source={
            settings.user_info.avatar
              ? { uri: settings.user_info.avatar }
              : require("../../../assets/avatar_placeholder.png")
          }
          style={[styles.avatar, { borderColor: settings.options.main_color }]}
        />
        {settings.user_info.date_log && (
          <TouchableOpacity
            onPress={() =>
              logout().then((result) => {
                setAuth(!isAuth);
              })
            }
          >
            <Ionicons
              size={30}
              name="ios-log-out"
              style={[styles.icons, { color: settings.options.main_color }]}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.nickname_container}>
        <Text style={[styles.nickname, { color: settings.options.main_color }]}>
          {settings.user_info.nickname ? settings.user_info.nickname : "Гость"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: "orange",
  },
  container: {
    marginTop: 20,
    flexDirection: "column",
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  nickname: {
    fontWeight: "bold",
  },

  nickname_container: {
    marginVertical: 10,
    alignItems: "center",
  },
});
