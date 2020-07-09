import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CommentIcon = ({
  route,
  iconColor,
  navigation,
  id,
  subject,
  controller,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Comments", {
          target_controller: controller,
          target_subject: subject,
          target_id: id,
          title: "Комментарии",
        });
      }}
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Ionicons
        name="ios-folder-open"
        size={24}
        style={{ marginRight: 10 }}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};
