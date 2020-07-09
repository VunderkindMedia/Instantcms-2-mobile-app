import React from "react";
import { View, Text, Image } from "react-native";
import { Dots } from "./Dots";

export const Comment = ({ item }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <Dots style={{ marginTop: 20 }} level={item.level} />

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginVertical: 10,
          marginHorizontal: 10,

          borderBottomWidth: 1,
          borderBottomColor: "#fff",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              marginRight: 10,
            }}
            source={{
              uri: item.user_avatar,
            }}
          />

          <Text
            style={{
              color: "#fff",
              marginHorizontal: 5,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {item.user_nickname}
          </Text>
          <Text style={{ color: "#fff", marginHorizontal: 5, fontSize: 12 }}>
            {item.date_diff}
          </Text>
        </View>
        <View>
          <Text style={{ color: "#fff", fontSize: 12 }}>{item.content}</Text>
        </View>
      </View>
    </View>
  );
};
