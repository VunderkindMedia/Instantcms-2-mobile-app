import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { AppearanceProvider } from "react-native-appearance";
import { AppState } from "./context/app/AppState";

import { MainScreen } from "./MainScreen";
import { AuthState } from "./context/auth/AuthState";
import { CommentsContext } from "./context/comments/CommentsContext";
import { CommentsState } from "./context/comments/CommentsState";

export default function App() {
  const [isReady, setReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setReady(true)}
      />
    );
  } else {
    return (
      <AppearanceProvider>
        <AppState>
          <CommentsState>
            <AuthState>
              <MainScreen />
            </AuthState>
          </CommentsState>
        </AppState>
      </AppearanceProvider>
    );
  }
}

const loadFonts = () => {
  console.log("INFO: Загрузка шрифтов");

  return Font.loadAsync({
    Sans_Serife: require("./assets/fonts/Sans_Serif.ttf"),
  });
};
