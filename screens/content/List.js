import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from "react-native";
import { AppContext } from "../../context/app/AppContext";
import { RenderFooter } from "./childs/RenderFooter";
import { ItemRow } from "./childs/ItemRow";
import { ErrorView } from "./ErrorView";
import { Ionicons } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

export const List = ({ navigation, route }) => {
  const {
    reaching,
    settings,
    get_items_list,
    itemsList,
    error,
    showLoader,
    loading,
    lazy,
    paging,
    ctype_title,
    showRefreshLoader,
    showLazyLoader
  } = useContext(AppContext);

  var page = 1;

  const [renderMain, setRenderMain] = useState(false);

  const isRefresh = () => {
    page = 1;
    showRefreshLoader();
    get_items_list(route.name, page, true);
  };

  const moreLoad = () => {
    page++;
    showLazyLoader();
    console.log("page", page);
    get_items_list(route.name, page);
  };

  setTimeout(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.toggleDrawer()}
          name="ios-menu"
          size={24}
          style={{ marginLeft: 10 }}
          color={settings.options.main_color}
        />
      )
    });
  }, 0);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setRenderMain(true);
      }, 0);
      get_items_list(route.params.ctype, page);
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      )}

      {!loading && itemsList.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Нет ни одной записи</Text>
        </View>
      )}
      {error && <ErrorView handle={showLoader} />}
      {!loading && renderMain && (
        <FlatList
          scrollsToTop={false}
          data={itemsList}
          refreshing={reaching}
          onRefresh={() => {
            isRefresh();
          }}
          onEndReached={() => {
            if (paging.has_next && !lazy) {
              moreLoad();
            }
          }}
          onEndReachedThreshold={0.5}
          renderItem={item => (
            <ItemRow
              data={item}
              ctype={route.name}
              navigation={navigation}
              title={ctype_title}
            />
          )}
          initialNumToRender={2}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={RenderFooter}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 5 }
});
