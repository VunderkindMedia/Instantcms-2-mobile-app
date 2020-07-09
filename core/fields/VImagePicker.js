import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { AppContext } from "../../context/app/AppContext";
import { BASE_URL } from "../../config/consts";

const VImagePicker = ({
  styleMainContainer,
  textStyle,
  iconBeforeLoadColor,
  iconSize,
  iconColor,
  imageStyle,
  imageContainer,
  placeholderStyle,
  onSelect,
  label,
  errors,
  name,
}) => {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { upload_photo, upload_error } = useContext(AppContext);
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Необходимо разрешить данному приложению доступ к камере!"
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (upload_error) {
      if (Platform.OS === "android") {
        ToastAndroid.show(upload_error, ToastAndroid.SHORT);
      } else {
        Alert.alert(upload_error);
      }
    }
  }, [upload_error]);

  const pickImage = async (type) => {
    let result;
    if (type === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        chooseFromLibraryButtonTitle: "asfasf",
        takePhotoButtonTitle: "some text",
        cancelButtonTitle: "some text",
      });
    } else if (type === "library") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        chooseFromLibraryButtonTitle: "asfasf",
        takePhotoButtonTitle: "some text",
        cancelButtonTitle: "some text",
      });
    }

    console.log(result);

    if (!result.cancelled) {
      setImage(null);
      setImageLoading(true);
      // setImage(result.uri);
      // onSelect(result.uri);
      upload_photo(result.uri).then((data) => {
        if (data) {
          setImage(data.host + data.items.small);
          onSelect(result.uri);
          setImageLoading(false);
        } else {
          setImageLoading(false);
        }
      });
    } else {
      imageLoading;
    }
  };
  return (
    <View style={styleMainContainer}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Откуда возьмем изображение?",
            "Камера или галлерея?",
            [
              {
                text: "Галлерея",
                onPress: () => pickImage("library"),
              },
              { text: "Камера", onPress: () => pickImage("camera") },
              {
                text: "Отмена",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }}
      >
        {!image ? (
          <View
            style={[placeholderStyle, errors[name] && { borderColor: "red" }]}
          >
            {imageLoading ? (
              <ActivityIndicator />
            ) : (
              <Ionicons size={iconSize} name={"ios-camera"} color={iconColor} />
            )}
          </View>
        ) : (
          <ImageBackground
            source={{ url: image }}
            style={imageContainer}
            imageStyle={imageStyle}
            loadingIndicatorSource
          >
            <View
              style={[
                placeholderStyle,
                {
                  flex: 1,
                  backgroundColor: "#fff",
                },
                imageLoading ? { opaciti: 0 } : { opacity: 0.4 },
              ]}
            ></View>

            {imageLoading ? (
              <ActivityIndicator
                size="large"
                color="#000"
                style={{ position: "absolute", top: "30%", left: "30%" }}
              />
            ) : (
              <Ionicons
                size={iconSize}
                name={"ios-camera"}
                color={image ? iconBeforeLoadColor : iconColor}
                style={{ position: "absolute", top: "25%", left: "33%" }}
              />
            )}
          </ImageBackground>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOptions: {
    padding: 50,
  },
  menuTrigger: {
    padding: 5,
  },

  contentText: {
    fontSize: 18,
  },
});

export default VImagePicker;
