import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Toggler } from "../../navigation/components/childs/Toggler";
import { useNavigation } from "@react-navigation/native";
import ViewPager from "@react-native-community/viewpager";
import { AppContext } from "../../context/app/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { PlacePageView } from "./childrens/PlacePageView";
import { CountersPageView } from "./childrens/CountersPageView";

export const Counters = () => {
  const navigation = useNavigation();
  const { settings, theme } = useContext(AppContext);
  Toggler(navigation);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => {}}>
        <Ionicons
          name="ios-add"
          size={34}
          style={{ marginRight: 20, marginLeft: 15, marginVertical: 7 }}
          color={settings.options.main_color}
        />
      </TouchableOpacity>
    ),
  });

  const headerViewPager = useRef(null);
  const mainViewPager = useRef(null);
  const [places, setPlaces] = useState([
    {
      id: 0,
      location: "ул. 60 лет СССР, 1 - 102",
      water_ls: 9999997777777,
      electric_ls: 7777779999999,
      gaz_ls: null,
      notifications: true,
    },
    {
      id: 1,
      location: "ул. 60 лет СССР, 1 - 103",
      water_ls: 9999997777777,
      electric_ls: null,
      gaz_ls: 9999997777777,
      notifications: true,
    },
  ]);
  const [page, setPage] = useState(0);
  const [places_pages, setPlacesPages] = useState([]);
  const [counters_pages, setCounterPages] = useState([]);

  useEffect(() => {
    console.log("PLACESLOG", places[0]);
    places.map((place) => {
      setPlacesPages((prev) => [
        ...prev,
        <PlacePageView key={place.id} place={place} />,
      ]);
      setCounterPages((prev) => [
        ...prev,
        <CountersPageView key={place.id} place={place} />,
      ]);
    });

    console.log(places_pages);
  }, [places]);

  useEffect(() => {
    console.log(page);
    mainViewPager.current.setPage(page);
    headerViewPager.current.setPage(page);
  }, [page]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 90,
        }}
      >
        <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (page > 0) setPage(page - 1);
          }}
        >
          <Ionicons
            name="ios-arrow-dropleft"
            size={36}
            style={{
              color: settings.options.main_color,
            }}
          />
        </TouchableOpacity>
        <ViewPager
          orientation="horizontal"
          scrollEnabled={false}
          ref={headerViewPager}
          style={styles.viewPager}
          initialPage={0}
        >
          {places.length === 0 ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
              }}
              key="1"
            >
              <Ionicons
                name="ios-notifications-outline"
                color={settings.options.main_color}
                size={24}
              />
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-pin"
                  size={24}
                  color={settings.options.main_color}
                />
                <Text
                  style={{
                    color:
                      theme === "dark"
                        ? settings.options.dark_mode_color5
                        : settings.options.light_mode_color5,
                  }}
                >
                  Вы не добавили ни одного адреса
                </Text>
                <Text></Text>
              </View>
              <Ionicons
                name="ios-trash"
                color={settings.options.main_color}
                size={24}
              />
            </View>
          ) : (
            places_pages
          )}
        </ViewPager>
        <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (page < places.length) setPage(page + 1);
          }}
        >
          <Ionicons
            name="ios-arrow-dropright"
            size={36}
            style={{
              color: settings.options.main_color,
            }}
          />
        </TouchableOpacity>
      </View>
      <ViewPager
        scrollEnabled={false}
        style={styles.viewPager2}
        initialPage={0}
        ref={mainViewPager}
      >
        {places.length === 0 ? (
          <View
            style={{
              height: 30,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
            key="1"
          >
            <Text
              style={{
                color:
                  theme === "dark"
                    ? settings.options.dark_mode_color5
                    : settings.options.light_mode_color5,
              }}
            >
              Вы не добавили ни одного адреса
            </Text>
          </View>
        ) : (
          counters_pages
        )}
      </ViewPager>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height: 90,
  },
  viewPager2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 35,
  },
});
