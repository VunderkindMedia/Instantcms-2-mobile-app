import React, { useState, useEffect, useCallback, useContext } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { AppState } from "./context/app/AppState";

import { MainScreen } from "./MainScreen";

export default function App() {
  [isReady, setReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onError={error => console.log(error)}
        onFinish={() => setReady(true)}
      />
    );
  } else {
    return (
      <AppState>
        <MainScreen />
      </AppState>
    );
  }
}

const loadFonts = () => {
  console.log("INFO: Загрузка шрифтов");

  return Font.loadAsync({
    Sans_Serife: require("./assets/fonts/Sans_Serif.ttf")
  });
};
