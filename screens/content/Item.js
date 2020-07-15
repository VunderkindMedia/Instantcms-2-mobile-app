import React, { useEffect, useContext, useState, useRef } from "react";
import {
  ScrollView,
  View,
  Platform,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { AppContext } from "../../context/app/AppContext";
import YoutubePlayer from "react-native-youtube-iframe";
import HTMLView from "react-native-htmlview";
import { SliderBox } from "react-native-image-slider-box";
import { Ionicons } from "@expo/vector-icons";
import { formattingDate, YouTubeGetID, AddHttp } from "../../utils/utils";
import { BASE_URL } from "../../config/consts";
import { WebView } from "react-native-webview";
import HTML from "react-native-render-html";
import { CommentIcon } from "../Comments/childs/CommentIcon";
import { Comments } from "../Comments/Comments";

export const Item = ({ route, navigation }) => {
  const { get_item, item_res, settings, theme } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef(null);
  var fields = [];
  var images = [];

  const loadItem = () => {
    get_item(route.params.ctype, route.params.item_id).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    loadItem();
  }, []);

  const Title = () => {
    return (
      <Text
        key={"title"}
        style={[
          styles(theme, settings).title,
          { color: settings.options.main_color },
        ]}
      >
        {item_res.item.title}
      </Text>
    );
  };

  const InfoBar = () => {
    return (
      <View key={"info"} style={styles(theme, settings).DataView}>
        <Ionicons
          style={[
            styles(theme, settings).DataIcons,
            { color: settings.options.main_color },
          ]}
          name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
        />
        <Text
          style={[
            styles(theme, settings).DataText,
            { color: settings.options.main_color },
          ]}
        >
          {formattingDate(item_res.item.date_pub)}
        </Text>
        <Ionicons
          style={[
            styles(theme, settings).DataIcons,
            { color: settings.options.main_color },
          ]}
          name={Platform.OS === "ios" ? "ios-eye" : "md-eye"}
        />
        <Text
          style={[
            styles(theme, settings).DataText,
            { color: settings.options.main_color },
          ]}
        >
          {item_res.item.hits_count}
        </Text>
        <Ionicons
          style={[
            styles(theme, settings).DataIcons,
            { color: settings.options.main_color },
          ]}
          name={Platform.OS === "ios" ? "ios-text" : "md-text"}
        />
        <Text
          style={[
            styles(theme, settings).DataText,
            { color: settings.options.main_color },
          ]}
        >
          {item_res.item.comments}
        </Text>
        <Ionicons
          style={[
            styles(theme, settings).DataIcons,
            { color: settings.options.main_color },
          ]}
          name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
        />
        <Text
          style={[
            styles(theme, settings).DataText,
            { color: settings.options.main_color },
          ]}
        >
          {item_res.item.rating}
        </Text>
      </View>
    );
  };

  function renderNode(node, defaultRenderer, index) {
    if (node.name === "span") {
      return null;
    }

    if (node.name === "iframe") {
      if (String(node.attribs.src).indexOf("youtube") !== -1) {
        node.attribs.src = String(node.attribs.src).replace(
          "//www",
          "https://www"
        );

        return (
          <YoutubePlayer
            key={node.attribs.src}
            ref={playerRef}
            height={Dimensions.get("screen").width / (16 / 9)}
            width={"100%"}
            videoId={YouTubeGetID(node.attribs.src)}
            play={false}
            onChangeState={(event) => console.log(event)}
            onReady={() => console.log("ready")}
            onError={(e) => console.log(e)}
            onPlaybackQualityChange={(q) => console.log(q)}
            volume={50}
            playbackRate={1}
            playerParams={{
              cc_lang_pref: "us",
              showClosedCaptions: true,
            }}
          />
        );
      }
    }
  }

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
              <View key={key} style={styles(theme, settings).filedsRow}>
                {item_res.additionally.fields[key].options.label_in_item !==
                  "none" && (
                  <Text
                    key={key + "title"}
                    style={[
                      {
                        color:
                          theme === "dark"
                            ? settings.options.dark_mode_color1
                            : settings.options.light_mode_color1,
                      },
                      styles(theme, settings).textFieldTitle,
                    ]}
                  >
                    {item_res.additionally.fields[key].title + ": "}
                  </Text>
                )}
                <View key={{ key }} style={{ flex: 1 }}>
                  {/* <HTMLView
                    value={item_res.item[key]
                      .replace(
                        /<img([^>]*)\ssrc=(['"])(\/[^\2*([^\2\s<]+)\2/gi,
                        "<img$1 src=$2" + BASE_URL + "$3$2"
                      )
                      .replace(/\r?\n/g, "")}
                    stylesheet={stylesHtml(theme, settings)}
                    addLineBreaks={false}
                    renderNode={renderNode}
                  /> */}

                  <HTML
                    html={item_res.item[key]
                      .replace(
                        /<img([^>]*)\ssrc=(['"])(\/[^\2*([^\2\s<]+)\2/gi,
                        "<img$1 src=$2" + BASE_URL + "$3$2"
                      )
                      .replace(/\r?\n/g, "")}
                    tagsStyles={stylesHtml(theme, settings)}
                    imagesMaxWidth={Dimensions.get("screen").width}
                    staticContentMaxWidth={Dimensions.get("screen").width}
                    alterChildren={(node) => {
                      if (node.name === "iframe" || node.name === "img") {
                        delete node.attribs.width;
                        delete node.attribs.height;
                        node.attribs.src = AddHttp(node.attribs.src);
                        console.log(node.attribs);
                      }
                      return node.children;
                    }}
                  />
                </View>
              </View>,
            ];
          } else {
            fields = [
              ...fields,
              <View key={key} style={styles(theme, settings).filedsRow}>
                {item_res.additionally.fields[key].options.label_in_item !==
                  "none" && (
                  <Text
                    key={key + "title"}
                    style={styles(theme, settings).textFieldTitle}
                  >
                    {item_res.additionally.fields[key].title + ": "}
                  </Text>
                )}

                <Text style={styles(theme, settings).txtFieldValue}>
                  {item_res.item[key].replace(/&quot;/g, '"')}
                </Text>
              </View>,
            ];
          }
        }
      }
    }

    for (var {} in item_res.additionally.fields) {
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
        <View style={styles(theme, settings).commentsView}>
          <Ionicons
            size={16}
            style={styles(theme, settings).commentsViewIcon}
            name="ios-megaphone"
          />
          <Text style={styles(theme, settings).commentsViewTitle}>
            Комментарии:
          </Text>
        </View>
        <Comments
          route={route}
          target_controller="content"
          target_subject={route.params.ctype}
          target_id={route.params.item_id}
        />
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

export const styles = (theme, settings) => {
  return StyleSheet.create({
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

    mainContainer: {},
    content: {
      marginVertical: 10,
    },
    title: {
      fontSize: 16,
      marginVertical: 10,
      marginHorizontal: 5,
    },
    filedsRow: {
      marginVertical: 5,
      marginHorizontal: 10,
      flexDirection: "row",
    },
    textFieldTitle: {
      marginHorizontal: 5,
      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },
    txtFieldValue: {
      flex: 1,

      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },
    commentsView: {
      flex: 1,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    commentsViewIcon: {
      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
      marginHorizontal: 10,
    },
    commentsViewTitle: {
      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },
  });
};

export const stylesHtml = (theme, settings) => {
  const style = StyleSheet.create({
    a: {
      color: settings.options.main_color,
      fontStyle: "italic",
    },
    p: {
      marginVertical: 5,

      color:
        theme === "dark"
          ? settings.options.dark_mode_color1
          : settings.options.light_mode_color1,
    },

    img: {
      margin: 0,
      right: 10,
      padding: 10,
    },
  });

  return style;
};
