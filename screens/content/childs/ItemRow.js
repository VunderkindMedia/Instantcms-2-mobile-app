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
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
// import HTML from "react-native-render-html";
import { Ionicons } from "@expo/vector-icons";
import { formattingDate } from "../../../utils/utils";
import JsxParser from "react-jsx-parser";
import TouchableView from "../../../utils/utils";

export const ItemRow = ({ data, ctype, navigation, title }) => {
  const { settings, theme } = useContext(AppContext);

  const goToItem = () => {
    navigation.push("Item", {
      title: title,
      item_id: data.item.id,
      ctype,
    });
  };

  if (settings.options["template_list_" + ctype] === "big_image") {
    return (
      <TouchableView onPress={() => goToItem()}>
        <View style={settings.options.styles.cardBigImage}>
          <ImageBackground
            imageStyle={{ borderRadius: 4 }}
            source={{
              uri:
                data.item.photo &&
                data.item.photo[settings.options["images_preset_list_" + ctype]]
                  ? data.item.photo[
                      settings.options["images_preset_list_" + ctype]
                    ]
                  : "https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png",
              cache: "force-cache",
            }}
            onLoad={() => {}}
            onLoadStart={() => {}}
            onLoadEnd={() => {}}
            style={settings.options.styles.imageBigImage}
          >
            <View style={settings.options.styles.headerViewBigImage}>
              <View
                style={[
                  settings.options.styles.catViewBigImage,
                  {
                    backgroundColor:
                      theme === "dark"
                        ? settings.options.dark_mode_color2
                        : settings.options.light_mode_color2,
                  },
                ]}
              >
                <Text
                  style={[
                    settings.options.styles.catTextBigImage,
                    { color: settings.options.main_color },
                  ]}
                >
                  {data.item.cat_name}
                </Text>
              </View>
            </View>

            <View
              style={[
                data.item.vazhnoe !== "Нет" && {
                  borderRightWidth: 10,
                  // borderTopWidth: 1,
                  // borderBottomWidth: 1,
                  borderColor: "orange",
                },
                settings.options.styles.bottomViewBigImage,
                {
                  backgroundColor:
                    theme === "dark"
                      ? settings.options.dark_mode_color2
                      : settings.options.light_mode_color2,
                },
              ]}
            >
              <Text
                style={[
                  settings.options.styles.textTitleBigImage,
                  { color: settings.options.main_color },
                ]}
                numberOfLines={2}
              >
                {data.item.title}
              </Text>
              <View style={settings.options.styles.infoBarView}>
                <Ionicons
                  style={[
                    settings.options.styles.infoBarIcons,
                    { color: settings.options.main_color },
                  ]}
                  name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
                />
                <Text
                  style={[
                    settings.options.styles.infoBarLabelsBigPhoto,
                    { color: settings.options.main_color },
                  ]}
                >
                  {formattingDate(data.item.date_pub)}
                </Text>
                <Ionicons
                  style={[
                    settings.options.styles.infoBarIcons,
                    { color: settings.options.main_color },
                  ]}
                  name={Platform.OS === "ios" ? "ios-eye" : "md-eye"}
                />
                <Text
                  style={[
                    settings.options.styles.infoBarLabelsBigPhoto,
                    { color: settings.options.main_color },
                  ]}
                >
                  {data.item.hits_count}
                </Text>
                <Ionicons
                  style={[
                    settings.options.styles.infoBarIcons,
                    { color: settings.options.main_color },
                  ]}
                  name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                />
                <Text
                  style={[
                    settings.options.styles.infoBarLabelsBigPhoto,
                    { color: settings.options.main_color },
                  ]}
                >
                  {data.item.comments}
                </Text>
                <Ionicons
                  style={[
                    settings.options.styles.infoBarIcons,
                    { color: settings.options.main_color },
                  ]}
                  name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
                />
                <Text
                  style={[
                    settings.options.styles.infoBarLabelsBigPhoto,
                    { color: settings.options.main_color },
                  ]}
                >
                  {data.item.rating}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableView>
    );
  } else if (settings.options["template_list_" + ctype] === "left_image") {
    return (
      <TouchableView onPress={() => goToItem()}>
        <View style={settings.options.styles.cardLeftPhoto}>
          <View style={settings.options.styles.mainViewLeftPhoto}>
            <Image
              imageStyle={{ borderRadius: 4 }}
              source={{
                uri: data.item.photo
                  ? data.item.photo.normal
                  : data.item.picture
                  ? data.item.picture.normal
                  : "https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png",
              }}
              style={settings.options.styles.imageLeftPhoto}
            />
            <View
              style={[
                settings.options.styles.rightViewLeftpPhoto,
                {
                  backgroundColor:
                    theme === "dark"
                      ? settings.options.dark_mode_color2
                      : settings.options.light_mode_color2,
                },
              ]}
            >
              <Text
                style={[
                  settings.options.styles.titleLeftPhoto,
                  { color: settings.options.main_color },
                ]}
                numberOfLines={2}
              >
                {data.item.title}
              </Text>
              <View style={settings.options.styles.infoBarView}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      style={[
                        settings.options.styles.infoBarIcons,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                      name={
                        Platform.OS === "ios" ? "ios-calendar" : "md-calendar"
                      }
                    />
                    <Text
                      style={[
                        settings.options.styles.infoBarLabelsLeftPhoto,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                    >
                      {formattingDate(data.item.date_pub)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      style={[
                        settings.options.styles.infoBarIcons,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                      name={Platform.OS === "ios" ? "ios-eye" : "md-eye"}
                    />
                    <Text
                      style={[
                        settings.options.styles.infoBarLabelsLeftPhoto,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                    >
                      {data.item.hits_count}
                    </Text>
                    <Ionicons
                      style={[
                        settings.options.styles.infoBarIcons,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                      name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                    />
                    <Text
                      style={[
                        settings.options.styles.infoBarLabelsLeftPhoto,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                    >
                      {data.item.comments}
                    </Text>
                    <Ionicons
                      style={[
                        settings.options.styles.infoBarIcons,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
                      ]}
                      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
                    />
                    <Text
                      style={[
                        settings.options.styles.infoBarLabelsLeftPhoto,
                        {
                          color:
                            theme === "dark"
                              ? settings.options.dark_mode_color1
                              : settings.options.light_mode_color1,
                        },
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
      </TouchableView>
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
          dark: true,
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
          TouchableView,
          TouchableOpacity,
          TouchableNativeFeedback,
          ImageBackground,

          // HTML,
          SliderBox,
        }}
        jsx={settings.options["template_custom_list_" + ctype]}
      />
    );
  }
};
