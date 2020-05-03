import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/app/AppContext";

import { View, ActivityIndicator } from "react-native";

import { AppNav } from "./navigation/AppNavigator";
import { ErrorView } from "./screens/content/ErrorView";

export const MainScreen = () => {
  const { get_icms2_settings, isAuth } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const onErrorHandle = () => {
    setError(false);
  };

  useEffect(() => {
    get_icms2_settings()
      .then((result) => {
        console.log(result);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [error, isAuth]);

  if (!ready && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else if (!ready && error) {
    return <ErrorView handle={onErrorHandle} />;
  } else {
    return <AppNav />;
  }
};
