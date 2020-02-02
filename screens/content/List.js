import React, { useReducer, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  FlatList
} from "react-native";
import { AppContext } from "../../context/app/AppContext";
import { RenderFooter } from "./childs/RenderFooter";
import { ItemRow } from "./childs/ItemRow";
import { ErrorView } from "./ErrorView";
import { Ionicons } from "@expo/vector-icons";

export const List = ({ navigation, route }) => {
  const {
    settings,
    loading,
    showLoader,
    hideLoader,
    itemsList,
    error,

    get_items_list
  } = useContext(AppContext);

  navigation.setOptions({
    headerLeft: () => (
      <Ionicons
        onPress={() => navigation.toggleDrawer()}
        name="ios-menu"
        size={20}
        style={{ marginLeft: 10 }}
        color={settings.options.main_color}
      />
    )
  });

  const loadItems = useCallback(async () => await get_items_list(route.name), [
    get_items_list
  ]);

  useEffect(() => {
    showLoader(true);
    loadItems();
    navigation.setOptions({ title: "" });
  }, []);

  if (itemsList.additionally && !loading) {
    console.log(itemsList.additionally.ctype.title);
    navigation.setOptions({ title: itemsList.additionally.ctype.title });
    return (
      <View style={styles.container}>
        <FlatList
          data={itemsList.items}
          // refreshing={}
          // onRefresh={}
          onEndReached={() => {}}
          onEndReachedThreshold={0.5}
          renderItem={item => (
            <ItemRow
              data={item}
              ctype={route.name}
              navigation={navigation}
              title={itemsList.additionally.ctype.title}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={RenderFooter}
        />
      </View>
    );
  } else if (itemsList.length === 0 && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Нет ни одной записи</Text>
      </View>
    );
  } else if (error) {
    return <ErrorView handle={showLoader} />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 5 }
});
