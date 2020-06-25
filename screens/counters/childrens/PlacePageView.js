import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { AppContext } from "../../../context/app/AppContext";

export const PlacePageView = ({ place, onSetNotification, onRemove }) => {
  const { settings, theme } = useContext(AppContext);
  console.log("PLACE", place.notification);

  return (
    <View
      key={place.id}
      style={{
        height: 90,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      key="1"
    >
      <Ionicons name="ios-pin" size={24} color={settings.options.main_color} />
      <View
        style={{
          flex: 1,
          width: "100%",

          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="ios-notifications"
          color={
            place.notifications
              ? settings.options.main_color
              : theme === "dark"
              ? settings.options.dark_mode_color5
              : settings.options.light_mode_color5
          }
          size={24}
        />
        <Text
          style={{
            color:
              theme === "dark"
                ? settings.options.dark_mode_color5
                : settings.options.light_mode_color5,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {place.location}
        </Text>
        <Ionicons name="ios-trash" color="red" size={24} />
      </View>
    </View>
  );
};
