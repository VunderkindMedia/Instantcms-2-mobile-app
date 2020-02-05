import React, { useContext } from "react";
import { AppContext } from "../../../context/app/AppContext";
import { View, ActivityIndicator } from "react-native";

export const RenderFooter = () => {
  const { lazy } = useContext(AppContext);

  if (!lazy) {
    return null;
  } else {
    return (
      <View style={{ margin: 20 }}>
        <ActivityIndicator style={{ color: "#000" }} />
      </View>
    );
  }
};
