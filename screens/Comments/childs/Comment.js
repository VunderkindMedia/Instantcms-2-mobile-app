import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Dots } from "./Dots";
import { AppContext } from "../../../context/app/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { formattingDate } from "../../../utils/utils";
export const Comment = ({ item }) => {
  const { theme, settings } = useContext(AppContext);
  const InfoBar = () => {
    return (
      <View key={"info"} style={styles(theme, settings).DataView}>
        <View style={styles(theme, settings).infoChildView}>
          <Ionicons
            style={[
              styles(theme, settings).DataIcons,
              { color: settings.options.main_color },
            ]}
            name={Platform.OS === "ios" ? "ios-share-alt" : "md-share-alt"}
          />

          <Text
            style={[
              styles(theme, settings).DataText,
              { color: settings.options.main_color },
            ]}
          >
            Ответить
          </Text>
        </View>

        <View style={styles(theme, settings).infoChildView}>
          <Ionicons
            style={[
              styles(theme, settings).DataIcons,
              { color: settings.options.main_color },
            ]}
            name={Platform.OS === "ios" ? "ios-arrow-up" : "md-arrow-up"}
          />
          <Text
            style={[
              styles(theme, settings).DataText,
              { color: settings.options.main_color },
            ]}
          >
            {item.rating}
          </Text>
          <Ionicons
            style={[
              styles(theme, settings).DataIcons,
              { color: settings.options.main_color },
            ]}
            name={Platform.OS === "ios" ? "ios-arrow-down" : "md-arrow-down"}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <Dots style={{ marginTop: 20 }} level={item.level} />

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginBottom: 5,
          marginTop: 2.5,
          marginHorizontal: 10,
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
        <View>
          <InfoBar />
        </View>
      </View>
    </View>
  );
};

const styles = ({ theme, settings }) => {
  return StyleSheet.create({
    DataView: {
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    DataIcons: {
      fontSize: 18,
    },
    DataText: {
      fontSize: 12,

      marginHorizontal: 5,
    },
    infoChildView: {
      alignItems: "center",
      flexDirection: "row",
    },
  });
};
