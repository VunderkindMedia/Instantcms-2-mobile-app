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
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
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

  return (
    <JsxParser
      bindings={{
        ...data.item,
        date_pub: formattingDate(data.item.date_pub),
        main_color: settings.options.main_color,
        teaser: data.item.teaser
          ? data.item.teaser.replace(/<[^>]+>/g, "")
          : null,
        goToItem: () => goToItem(),
        theme: theme,
        ...settings.options,
        realWidth: Dimensions.get("window").width,
        realHeight: Dimensions.get("window").height,
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
        Platform,
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
};
