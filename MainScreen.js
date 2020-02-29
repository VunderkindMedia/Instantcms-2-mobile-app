import React, { useContext, useCallback, useEffect, useState } from "react";
import { AppContext } from "./context/app/AppContext";
import { AppLoading } from "expo";
import { View, Text, ActivityIndicator } from "react-native";
import { List } from "./screens/content/List";
import AppNav from "./navigation/AppNavigator";
import { ErrorView } from "./screens/content/ErrorView";

export const MainScreen = () => {
  const { get_icms2_settings, error } = useContext(AppContext);
  const loadOptions = useCallback(async () => await get_icms2_settings(), []);
  const [ready, setReady] = useState(false);
  const onErrorHandle = () => {
    setReady(false);
    console.log(ready);
    console.log("Error " + error);
  };

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <AppLoading
          startAsync={loadOptions}
          onError={error => console.log(error)}
          onFinish={() => {
            setReady(true);
          }}
        />
      </View>
    );
  } else if (error) {
    return <ErrorView handle={onErrorHandle} />;
  } else {
    return <AppNav />;
  }
};
