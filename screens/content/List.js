import React, { useState, useContext, useCallback, useRef } from "react";
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

let page = 1;

const List = ({ navigation, route }) => {
  console.log("re-render");
  const {
    settings,
    get_items_list,
    itemsList,
    error,
    showLoader,
    paging,
    ctype_title
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [lazyLoad, setLazyLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const isRefresh = () => {
    page = 1;
    setRefresh(true);
    get_items_list(route.name, page, refresh).then(() => {
      setRefresh(false);
    });
  };

  const moreLoad = () => {
    page++;
    setLazyLoad(true);
    get_items_list(route.params.ctype, page).then(() => {
      setLazyLoad(false);
    });
  };

  useFocusEffect(
    useCallback(() => {
      page = 1;
      setLoading(true);
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
      get_items_list(route.params.ctype, page).then(() => {
        setLoading(false);
      });
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!loading && itemsList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Нет ни одной записи</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorView handle={showLoader} />;
  }

  if (!loading) {
    return (
      <FlatList
        scrollsToTop={false}
        data={itemsList}
        refreshing={refresh}
        onRefresh={() => {
          isRefresh();
        }}
        onEndReached={() => {
          if (paging.has_next && !lazyLoad) {
            moreLoad();
          }
        }}
        onEndReachedThreshold={0.5}
        numColumns={1}
        renderItem={item => (
          <ItemRow
            data={item}
            ctype={route.name}
            navigation={navigation}
            title={ctype_title}
          />
        )}
        initialNumToRender={0}
        keyExtractor={(item, index) => String(index)}
        ListFooterComponent={RenderFooter(lazyLoad)}
      />
    );
  }
};

export const MemoList = React.memo(List);
