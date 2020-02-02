import React from "react";
import { View, Text, Button } from "react-native";

export const ErrorView = props => {
  const pressHandle = () => {
    props.handle();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Text>Что-то пошло не так! Возможно у Вас проблеммы с интернетом...</Text>
      <Button title="Попробывать еще раз" onPress={pressHandle} />
    </View>
  );
};
