import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "./context/app/AppContext";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { View, ActivityIndicator, StatusBar, Settings } from "react-native";

import { AppNav } from "./navigation/AppNavigator";
import { ErrorView } from "./screens/content/ErrorView";

export const MainScreen = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      Notifications.getExpoPushTokenAsync().then((result) => {
        console.log(result);
        send_token(result.data);
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const { get_icms2_settings, rel, theme, settings, send_token } = useContext(
    AppContext
  );
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
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setReady(false);
    get_icms2_settings()
      .then((result) => {
        console.log(result.user_info);
        if (result.user_info.id) {
          registerForPushNotificationsAsync();
        }
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
          barStyle={
            settings.options.webview_on
              ? "dark-content"
              : theme === "dark"
              ? "light-content"
              : "dark-content"
          }
        />
        <AppNav />
      </View>
    );
  }
};
