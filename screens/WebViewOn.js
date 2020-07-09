import React, { useContext } from "react";
import { View, ScrollView, Text, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { AppContext } from "../context/app/AppContext";
import { BASE_URL } from "../config/consts";

export const WebViewOn = () => {
  const JsCode =
    'document.addEventListener("message", function(data) {document.cookie=`cookiesName=${data.data}`;});';
  const { settings } = useContext(AppContext);
  return (
    <WebView
      injectedJavaScript={JsCode}
      source={{ uri: BASE_URL }}
      style={{ marginTop: 20 }}
    />
  );
};
