import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/app/AppContext";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { View, ActivityIndicator, StatusBar, Settings } from "react-native";

import { AppNav } from "./navigation/AppNavigator";
import { ErrorView } from "./screens/content/ErrorView";

export const MainScreen = () => {
  const { get_icms2_settings, rel, theme, settings } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const onErrorHandle = () => {
    setError(false);
  };

  // useEffect(() => {
  //   // returned function will be called on component unmount

  //   const token_reg = async () => {
  //     const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     if (status !== "granted") {
  //       alert(
  //         "Hey! You might want to enable notifications for my app, they are good."
  //       );
  //       await Notifications.getExpoPushTokenAsync();
  //       token_reg().then((token) => {
  //         console.log(token);
  //       });
  //     }
  //   };

  //   if (Platform.OS === "android") {
  //     Notifications.createChannelAndroidAsync("default", {
  //       name: "default",
  //       sound: true,
  //       priority: "max",
  //       vibrate: [0, 250, 250, 250],
  //     });
  //   }
  // }, []);

  useEffect(() => {
    setReady(false);
    get_icms2_settings()
      .then((result) => {
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [error, rel]);

  if (!ready && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else if (!ready && error) {
    return <ErrorView handle={onErrorHandle} />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          // backgroundColor={
          //   theme === "dark"
          //     ? settings.options.dark_mode_color2
          //     : settings.options.light_mode_color2
          // }
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <AppNav />
      </View>
    );
  }
};
