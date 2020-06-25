import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AppContext } from "../../../context/app/AppContext";

export const CountersPageView = ({ place }) => {
  const { settings, theme } = useContext(AppContext);
  console.log("PLACED", place.electric_ls);

  // return (
  //   <View key={place.id} style={{ flex: 1, flexDirection: "column" }}>
  //     <View style={styles(settings, theme).counterContainer}>
  //       <Ionicons
  //         size={24}
  //         name="ios-flash"
  //         color={settings.options.main_color}
  //       />

  //       <View style={{ flex: 1, marginLeft: 25 }}>
  //         <Text
  //           style={{
  //             color:
  //               theme === "dark"
  //                 ? settings.options.dark_mode_color5
  //                 : settings.options.light_mode_color5,
  //           }}
  //         >
  //           ЭЛЕКТРИЧЕСТВО
  //         </Text>
  //         <Text
  //           style={{
  //             color: place.electric_ls
  //               ? settings.options.main_color
  //               : theme === "dark"
  //               ? settings.options.dark_mode_color5
  //               : settings.options.light_mode_color5,
  //           }}
  //         >
  //           {place.electric_ls
  //             ? "Лицевой счет: " + place.electric_ls
  //             : "Настройте счетчик"}
  //         </Text>
  //       </View>
  //       <TouchableOpacity>
  //         <Ionicons
  //           name={!place.electric_ls ? "ios-add-circle-outline" : "ios-create"}
  //           size={24}
  //           color={settings.options.main_color}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //     <View style={styles(settings, theme).counterContainer}>
  //       <Ionicons
  //         size={24}
  //         name="ios-water"
  //         color={settings.options.main_color}
  //       />

  //       <View style={{ flex: 1, marginLeft: 25 }}>
  //         <Text
  //           style={{
  //             color:
  //               theme === "dark"
  //                 ? settings.options.dark_mode_color5
  //                 : settings.options.light_mode_color5,
  //           }}
  //         >
  //           ВОДОСНАБЖЕНИЕ
  //         </Text>
  //         <Text
  //           style={{
  //             color: place.water_ls
  //               ? settings.options.main_color
  //               : theme === "dark"
  //               ? settings.options.dark_mode_color5
  //               : settings.options.light_mode_color5,
  //           }}
  //         >
  //           {place.water_ls
  //             ? "Лицевой счет: " + place.water_ls
  //             : "Настройте счетчик"}
  //         </Text>
  //       </View>
  //       <TouchableOpacity>
  //         <Ionicons
  //           name={!place.water_ls ? "ios-add-circle-outline" : "ios-create"}
  //           size={24}
  //           color={settings.options.main_color}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //     <View style={styles(settings, theme).counterContainer}>
  //       <Ionicons
  //         size={24}
  //         name="ios-bonfire"
  //         color={settings.options.main_color}
  //       />

  //       <View style={{ flex: 1, marginLeft: 25 }}>
  //         <Text
  //           style={{
  //             color:
  //               theme === "dark"
  //                 ? settings.options.dark_mode_color5
  //                 : settings.options.light_mode_color5,
  //           }}
  //         >
  //           ГАЗ
  //         </Text>
  //         <Text
  //           style={{
  //             color: place.gaz_ls
  //               ? settings.options.main_color
  //               : theme === "dark"
  //               ? settings.options.dark_mode_color5
  //               : settings.options.light_mode_color5,
  //           }}
  //         >
  //           {place.gaz_ls
  //             ? "Лицевой счет: " + place.gaz_ls
  //             : "Настройте счетчик"}
  //         </Text>
  //       </View>
  //       <TouchableOpacity>
  //         <Ionicons
  //           name={!place.gaz_ls ? "ios-add-circle-outline" : "ios-create"}
  //           size={24}
  //           color={settings.options.main_color}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  return (
    <View
      key={0}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>1</Text>
      <Text style={{ color: "#fff" }}>2</Text>
      <Text style={{ color: "#fff" }}>3</Text>
    </View>
  );
};

const styles = (settings) =>
  StyleSheet.create({
    counterContainer: {
      borderColor: settings.options.main_color,
      borderWidth: 0.5,
      borderRadius: 20,
      height: 90,
      marginBottom: 35,
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 10,
    },
  });
