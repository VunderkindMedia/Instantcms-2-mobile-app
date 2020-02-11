import React, { useEffect, useContext, useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions
} from "react-native";
import { AppContext } from "../../context/app/AppContext";
import HTML from "react-native-render-html";
import { SliderBox } from "react-native-image-slider-box";
import { Ionicons } from "@expo/vector-icons";
import { formattingDate } from "../../utils/utils";
import { BASE_URL } from "../../config/consts";

export const Item = ({ route, navigation }) => {
  const { get_item, loading, error, item_res, settings } = useContext(
    AppContext
  );

  navigation.setOptions({ title: route.params.title });
  console.log("loading", loading);
  var fields = [];
  var images = [];
  var props = [];

  const loadItem = useCallback(async () => {
    await get_item(route.params.ctype, route.params.item_id);
  }, []);

  useEffect(() => {
    loadItem();
  }, []);

  // const Content = () => {
  //   return (
  //     <View
  //       key={"content"}
  //       style={[styles.content, { color: settings.options.main_color }]}
  //     >

  //     </View>
  //   );
  // };

  const Title = () => {
    return (
      <Text
        key={"title"}
        style={[styles.title, { color: settings.options.main_color }]}
      >
        {item_res.item.title}
      </Text>
    );
  };

  const InfoBar = () => {
    return (
      <View key={"info"} style={styles.DataView}>
        <Ionicons
          style={[styles.DataIcons, { color: settings.options.main_color }]}
          name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
        />
        <Text style={[styles.DataText, { color: settings.options.main_color }]}>
          {formattingDate(item_res.item.date_pub)}
        </Text>
        <Ionicons
          style={[styles.DataIcons, { color: settings.options.main_color }]}
          name={Platform.OS === "ios" ? "ios-eye" : "md-eye"}
        />
        <Text style={[styles.DataText, { color: settings.options.main_color }]}>
          {item_res.item.hits_count}
        </Text>
        <Ionicons
          style={[styles.DataIcons, { color: settings.options.main_color }]}
          name={Platform.OS === "ios" ? "ios-text" : "md-text"}
        />
        <Text style={[styles.DataText, { color: settings.options.main_color }]}>
          {item_res.item.comments}
        </Text>
        <Ionicons
          style={[styles.DataIcons, { color: settings.options.main_color }]}
          name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
        />
        <Text style={[styles.DataText, { color: settings.options.main_color }]}>
          {item_res.item.rating}
        </Text>
      </View>
    );
  };

  if (!loading) {
    //Парсим фото в слайдер
    if (item_res.item.photo && item_res.item.photo.normal) {
      images = [...images, item_res.item.photo.normal];
      for (var uris in item_res.item.photos) {
        images = [...images, item_res.item.photos[uris].big];
      }
    } else if (route.params.ctype === "posts" && item_res.item.picture) {
      images = [...images, item_res.item.picture.normal];
    }
    //Парсим остальные поля
    for (var key in item_res.additionally.fields) {
      //Парсим все, кроме данных полей - они выводятся статично
      if (
        key !== "photo" &&
        key !== "photos" &&
        key !== "user" &&
        key !== "date_pub" &&
        key !== "title" &&
        key !== "picture"
      ) {
        if (
          item_res.additionally.fields[key].is_in_item === "1" &&
          item_res.item[key] !== null
        ) {
          if (
            item_res.additionally.fields[key].type === "html" ||
            item_res.additionally.fields[key].type === "source"
          ) {
            fields = [
              ...fields,
              <View key={key} style={styles.filedsRow}>
                {item_res.additionally.fields[key].options.label_in_item !==
                  "none" && (
                  <Text key={key + "title"} style={styles.textFieldTitle}>
                    {item_res.additionally.fields[key].title + ": "}
                  </Text>
                )}
                <View key={{ key }} style={{ flex: 1 }}>
                  <HTML
                    // ignoredTags={["span"]}
                    renderers={{
                      p: (children, htmlAttribs) => (
                        <Text key={Math.random()} style={{ marginVertical: 5 }}>
                          {htmlAttribs}
                        </Text>
                      )
                    }}
                    staticContentMaxWidth={Dimensions.get("window").width}
                    imagesMaxWidth={Dimensions.get("window").width}
                    tagsStyles={{ img: { marginBottom: 5, marginRight: 5 } }}
                    html={item_res.item[key].replace(
                      /<img([^>]*)\ssrc=(['"])(\/[^\2*([^\2\s<]+)\2/gi,
                      "<img$1 src=$2" + BASE_URL + "$3$2"
                    )}
                    //
                  />
                </View>
              </View>
            ];
          } else {
            fields = [
              ...fields,
              <View key={key} style={styles.filedsRow}>
                {item_res.additionally.fields[key].options.label_in_item !==
                  "none" && (
                  <Text key={key + "title"} style={styles.textFieldTitle}>
                    {item_res.additionally.fields[key].title + ": "}
                  </Text>
                )}

                <Text style={{ flex: 1 }}>
                  {item_res.item[key].replace(/&quot;/g, '"')}
                </Text>
              </View>
            ];
          }
        }
      }
    }

    for (var prop in item_res.additionally.fields) {
    }

    return (
      <ScrollView>
        <SliderBox
          key={
            item_res.item.photo ? item_res.item.photo : item_res.item.picture
          }
          images={images}
          imageLoadingColor="#2196F3"
        />
        <Title />

        {fields}
        <InfoBar />
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  DataView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: "row"
  },
  DataIcons: {
    fontSize: 14
  },
  DataText: {
    fontSize: 12,

    marginRight: 15,
    marginLeft: 5
  },
  filedsRow: {},
  mainContainer: {},
  content: {
    marginHorizontal: 5,
    marginVertical: 10
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 5
  },
  filedsRow: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row"
  },
  textFieldTitle: {},
  textFieldValue: { flex: 1 }
});
