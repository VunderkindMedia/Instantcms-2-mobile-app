import React, { useContext } from "react";
import { AppContext } from "../../../context/app/AppContext";
import {
  Card,
  Button,
  Image,
  ImageBackground,
  View,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import HTML from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { formattingDate } from "../../../utils/utils";
import JsxParser from "react-jsx-parser";

export const ItemRow = ({ data, ctype, navigation, title }) => {
  const { settings, showLoader } = useContext(AppContext);
  const goToItem = () => {
    //console.log(data.item.title);

    navigation.push("Item", {
      title: title,
      item_id: data.item.id,
      ctype,
    });
  };

  if (settings.options["template_list_" + ctype] === "big_image") {
    return (
      <TouchableOpacity onPress={() => goToItem()}>
        <View style={styles.Card}>
          <ImageBackground
            imageStyle={{ borderRadius: 4 }}
            source={{
              uri:
                data.item.photo && data.item.photo.normal
                  ? data.item.photo.normal
                  : "https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png",
              cache: "force-cache",
            }}
            onLoad={() => {}}
            onLoadStart={() => {}}
            onLoadEnd={() => {}}
            style={styles.Image}
          >
            <View style={styles.HeaderView}>
              <View style={styles.CatView}>
                <Text
                  style={[
                    styles.CatText,
                    { color: settings.options.main_color },
                  ]}
                >
                  {data.item.cat_name}
                </Text>
              </View>
            </View>
            <View style={styles.BottomView}>
              <View style={styles.TextView}>
                <Text
                  style={[styles.Text, { color: settings.options.main_color }]}
                >
                  {data.item.title}
                </Text>
                <View style={styles.DataView}>
                  <Ionicons
                    style={[
                      styles.DataIcons,
                      { color: settings.options.main_color },
                    ]}
                    name={
                      Platform.OS === "ios" ? "ios-calendar" : "md-calendar"
                    }
                  />
                  <Text
                    style={[
                      styles.DataText,
                      { color: settings.options.main_color },
                    ]}
                  >
                    {formattingDate(data.item.date_pub)}
                  </Text>
                  <Ionicons
                    style={[
                      styles.DataIcons,
                      { color: settings.options.main_color },
                    ]}
                    name={Platform.OS === "ios" ? "ios-eye" : "md-eye"}
                  />
                  <Text
                    style={[
                      styles.DataText,
                      { color: settings.options.main_color },
                    ]}
                  >
                    {data.item.hits_count}
                  </Text>
                  <Ionicons
                    style={[
                      styles.DataIcons,
                      { color: settings.options.main_color },
                    ]}
                    name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                  />
                  <Text
                    style={[
                      styles.DataText,
                      { color: settings.options.main_color },
                    ]}
                  >
                    {data.item.comments}
                  </Text>
                  <Ionicons
                    style={[
                      styles.DataIcons,
                      { color: settings.options.main_color },
                    ]}
                    name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
                  />
                  <Text
                    style={[
                      styles.DataText,
                      { color: settings.options.main_color },
                    ]}
                  >
                    {data.item.rating}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  } else if (settings.options["template_list_" + ctype] === "left_image") {
    return (
      <TouchableOpacity onPress={() => goToItem()}>
        <View style={styles.CardLeftPhoto}>
          <View style={styles.LeftPhotoMainView}>
            <Image
              imageStyle={{ borderRadius: 4 }}
              source={{
                uri: data.item.photo
                  ? data.item.photo.small
                  : data.item.picture
                  ? data.item.picture.normal
                  : "https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png",
              }}
              style={styles.ImageLeft}
            />
            <View style={styles.LeftColumnView}>
              <Text
                style={[
                  styles.TextLeftPhoto,
                  { color: settings.options.main_color },
                ]}
              >
                {data.item.title}
              </Text>
              <View style={styles.DataView}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      style={[
                        styles.DataIcons,
                        { color: settings.options.main_color },
                      ]}
                      name={
                        Platform.OS === "ios" ? "ios-calendar" : "md-calendar"
                      }
                    />
                    <Text
                      style={[
                        styles.DataLeftPhotoText,
                        { color: settings.options.main_color },
                      ]}
                    >
                      {formattingDate(data.item.date_pub)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      style={[
                        styles.DataIcons,
                        { color: settings.options.main_color },
                      ]}
                      name={Platform.OS === "ios" ? "ios-eye" : "md-eye"}
                    />
                    <Text
                      style={[
                        styles.DataLeftPhotoText,
                        { color: settings.options.main_color },
                      ]}
                    >
                      {data.item.hits_count}
                    </Text>
                    <Ionicons
                      style={[
                        styles.DataIcons,
                        { color: settings.options.main_color },
                      ]}
                      name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                    />
                    <Text
                      style={[
                        styles.DataLeftPhotoText,
                        { color: settings.options.main_color },
                      ]}
                    >
                      {data.item.comments}
                    </Text>
                    <Ionicons
                      style={[
                        styles.DataIcons,
                        { color: settings.options.main_color },
                      ]}
                      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
                    />
                    <Text
                      style={[
                        styles.DataLeftPhotoText,
                        { color: settings.options.main_color },
                      ]}
                    >
                      {data.item.rating}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (settings.options["template_list_" + ctype] === "custom_template") {
    return (
      <JsxParser
        bindings={{
          ...data.item,
          date_pub: formattingDate(data.item.date_pub),
          main_color: settings.options.main_color,
          teaser: data.item.teaser
            ? data.item.teaser.replace(/<[^>]+>/g, "")
            : null,
          myHandler: () => goToItem(),
        }}
        blacklistedAttrs={null}
        componentsOnly={false}
        showWarnings={true} // if true showWarnings, rendering errors are output with console.warn
        renderError={true}
        renderInWrapper={false}
        components={{
          View,
          Text,
          Text,
          Button,
          Ionicons,
          Card,
          Image,
          TouchableOpacity,
          ImageBackground,
          HTML,
        }}
        jsx={settings.options["template_custom_list_" + ctype]}
      />
    );
  }
};

const styles = StyleSheet.create({
  Card: {
    borderRadius: 4,
    flex: 1,

    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  CardLeftPhoto: {
    borderRadius: 6,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 4,
    marginRight: 4,
    flex: 1,
  },
  HeaderView: {
    flex: 1,

    alignItems: "flex-end",
  },
  BottomView: {
    flex: 2,
    marginRight: 50,
    justifyContent: "flex-end",
  },
  Image: {
    width: null,
    borderRadius: 4,
    height: 250,
    justifyContent: "flex-end",
    flex: 1,
  },
  Text: {
    margin: 10,

    fontWeight: "bold",
  },

  TextView: {
    opacity: 0.9,

    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  CatView: {
    opacity: 0.9,
    justifyContent: "flex-end",
    width: 170,
    marginTop: 20,
    padding: 3,
    alignItems: "center",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,

    backgroundColor: "#fff",
  },
  DataView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  DataIcons: {
    fontSize: 14,
  },
  DataText: {
    fontSize: 12,

    marginRight: 15,
    marginLeft: 5,
  },
  DataLeftPhotoText: {
    fontSize: 12,

    marginRight: 15,
    marginLeft: 7,
  },
  CatText: {
    fontWeight: "bold",
  },
  ImageLeft: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  LeftPhotoMainView: {
    flexDirection: "row",
  },
  LeftColumnView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  TextLeftPhoto: {
    margin: 7,
    fontSize: 14,
  },
});
