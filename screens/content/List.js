import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  InteractionManager,
} from "react-native";
import { AppContext } from "../../context/app/AppContext";
import { RenderFooter } from "./childs/RenderFooter";
import { ItemRow } from "./childs/ItemRow";
import { ErrorView } from "./ErrorView";
import { Ionicons } from "@expo/vector-icons";
import { CLEAR_ERROR } from "../../context/app/types";
import { Toggler } from "../../navigation/components/childs/Toggler";

// import { useFocusEffect } from "@react-navigation/native";
let page = 1;
export const List = ({ navigation, route }) => {
  console.log("re-render");
  const {
    settings,
    get_items_list,
    itemsList,
    paging,
    ctype_title,
    additionally,
    theme,
  } = useContext(AppContext);

  const [ready, setReady] = useState(false);
  const [lazyLoad, setLazyLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);

  const onErrorHandle = () => {
    setError(false);
  };

  const isRefresh = () => {
    page = 1;
    setRefresh(true);
    get_items_list(route.params.ctype, page, refresh)
      .then(() => {
        setRefresh(false);
      })
      .catch((error) => {
        console.log("List Refresh Error: ", error);
        setRefresh(false);
        setError(true);
      });
  };

  const moreLoad = () => {
    page++;
    setLazyLoad(true);
    get_items_list(route.params.ctype, page)
      .then((result) => {
        console.log("Lazyresult", result);
        console.log(page);
        setLazyLoad(false);
      })
      .catch((error) => {
        console.log("List More Load Error: ", error);
        setLazyLoad(false);
        setError(true);
      });
  };

  Toggler(navigation);

  useEffect(() => {
    page = 1;

    get_items_list(route.params.ctype, page)
      .then(() => {
        setReady(true);
      })
      .catch((error) => {
        console.log("List Error: ", error);

        setError(true);
      });
  }, [error]);

  if (!ready && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else if (ready && !error && itemsList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Нет ни одной записи</Text>
      </View>
    );
  } else if (error) {
    return <ErrorView handle={onErrorHandle} />;
  } else if (ready && !error && itemsList.length > 0) {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          {additionally.ctype.is_cats === "1" ? (
            <Ionicons
              onPress={() => {
                navigation.navigate("Categories", {
                  ctype: route.params.ctype,
                });
              }}
              name="ios-folder-open"
              size={24}
              style={{ marginRight: 10 }}
              color={settings.options.main_color}
            />
          ) : null}

          {additionally.ctype.options.list_show_filter === 1 ? (
            <Ionicons
              onPress={() => {
                navigation.navigate("Filter", {
                  ctype: route.params.ctype,
                });
              }}
              name="ios-funnel"
              size={24}
              style={{ marginRight: 10 }}
              color={settings.options.main_color}
            />
          ) : null}
        </View>
      ),
    });

    return (
      <FlatList
        scrollsToTop={false}
        style={{
          marginVertical: 5,
          backgroundColor:
            theme === "dark"
              ? settings.options.dark_mode_color3
              : settings.options.light_mode_color3,
        }}
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
        numColumns={settings.options["grid_list_columns_" + route.params.ctype]}
        renderItem={(item) => (
          <ItemRow
            data={item}
            ctype={route.params.ctype}
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
