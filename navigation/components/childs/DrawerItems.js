import { DrawerItem } from "@react-navigation/drawer";
import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/app/AppContext";

export function DrawerItems({
  state,
  navigation,
  descriptors,
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor = "transparent",
  itemStyle,
  labelStyle,
  activeLabelStyle,
  inactiveLabelStyle
}) {
  const { settings, showLoader } = useContext(AppContext);
  return state.routes.map((route, i) => {
    const focused = i === state.index;

    const { title, drawerLabel, drawerIcon } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        focused={focused}
        style={[
          {
            backgroundColor: focused
              ? settings.options.main_color
              : inactiveBackgroundColor
          },
          itemStyle
        ]}
        labelStyle={[
          labelStyle,
          focused ? { color: "#fff" } : { color: settings.options.main_color }
        ]}
        onPress={() => {
          showLoader();

          !focused ? navigation.navigate(route.name) : navigation.closeDrawer();
        }}
      />
    );
  });
}
