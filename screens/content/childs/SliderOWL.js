import React, { useContext, useEffect, useState } from "react";
import HTML from "react-native-render-html";
import { BASE_URL } from "../../../config/consts";
import {
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  View,
} from "react-native";
import { AppContext } from "../../../context/app/AppContext";

export const SliderOWL = ({
  photos,
  countLabelBackground,
  countLabelColor,
  sliderWidth,
  imageStyle,
}) => {
  const { theme, settings } = useContext(AppContext);
  const [photo, setPhoto] = useState();
  const [photoCount, setPhotoCount] = useState();
  useEffect(() => {
    const rexPhoto = /\< *[img][^\>]*[src] *= *[\"\']{0,1}([^\"\'\ >]*)/;
    const rexPhotoCount = /<span.*?>(.*)<\/span>/;
    setPhoto(
      rexPhoto.exec(
        photos
          .replace(
            /<img([^>]*)\ssrc=(['"])(\/[^\2*([^\2\s<]+)\2/gi,
            "<img$1 src=$2" + BASE_URL + "$3$2"
          )
          .replace(/\r?\n/g, "")
      )[1]
    );
    setPhotoCount(
      rexPhotoCount.exec(
        photos
          .replace(
            /<img([^>]*)\ssrc=(['"])(\/[^\2*([^\2\s<]+)\2/gi,
            "<img$1 src=$2" + BASE_URL + "$3$2"
          )
          .replace(/\r?\n/g, "")
      )[1]
    );
  }, []);

  return (
    <ImageBackground
      style={[
        imageStyle,
        {
          width: sliderWidth,
          aspectRatio: 1,
          resizeMode: "contain",
        },
      ]}
      source={{ uri: photo }}
    >
      <View
        style={{
          position: "absolute",
          right: 5,
          top: 5,
          borderRadius: 5,
          backgroundColor: countLabelBackground,
        }}
      >
        <Text
          style={{
            marginVertical: 2,
            marginHorizontal: 5,
            color: countLabelColor,
          }}
        >
          {photoCount}
        </Text>
      </View>
    </ImageBackground>
  );
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
