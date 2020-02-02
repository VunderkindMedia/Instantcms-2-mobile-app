import { useContext } from "react";
import { AppContext } from "../../../context/app/AppContext";
import React from "react";
import { View, ActivityIndicator } from "react-native";

export const RenderFooter = () => {
  const { loading } = useContext(AppContext);
  if (!loading) {
    return null;
  } else {
    return (
      <View style={{ margin: 20 }}>
        <ActivityIndicator style={{ color: "#000" }} />
      </View>
    );
  }
};
