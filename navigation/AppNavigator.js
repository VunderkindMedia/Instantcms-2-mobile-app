import React, { useContext } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationNativeContainer } from "@react-navigation/native";
import { List } from "../screens/content/List";
import { Item } from "../screens/content/Item";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "../context/app/AppContext";
import { ActivityIndicator, View } from "react-native";
import DrawerContent from "./components/DrawerContent";
import { Settings } from "../screens/content/Settings";
import { SignIn } from "../screens/Auth/SighIn";
import { initialState } from "../context/app/AppReducer";
import { ErrorView } from "../screens/content/ErrorView";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export function ContentStack({ navigation, route }) {
  const { settings } = useContext(AppContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: settings.options.main_color
      }}
    >
      <Stack.Screen name={route.name} component={List} />
      <Stack.Screen name={route.name + "Item"} component={Item} />
    </Stack.Navigator>
  );
}

export function SettingsStack({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.name}
        component={Settings}
        options={{ title: "Настройки" }}
      />
    </Stack.Navigator>
  );
}

export function AuthStack({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.name}
        component={SignIn}
        options={{ title: "Авторизация" }}
      />
    </Stack.Navigator>
  );
}

function DrawerMenu() {
  const { loading, settings } = useContext(AppContext);
  var initial_menu = [];

  for (id in settings.menu) {
    if (settings.menu[id].url.split("#")[0] === "auth") {
      initial_menu = [
        <Drawer.Screen
          key={id}
          name={settings.menu[id].url.split("#")[0]}
          component={AuthStack}
          options={{ drawerLabel: settings.menu[id].title }}
        />,
        ...initial_menu
      ];
    } else {
      initial_menu = [
        ...initial_menu,
        <Drawer.Screen
          key={id}
          name={settings.menu[id].url.split("#")[0]}
          component={ContentStack}
          options={{ drawerLabel: settings.menu[id].title }}
        />
      ];
    }
  }

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 240,
        activeBackgroundColor: "#000"
      }}
      drawerType="slide"
      unmountInactiveScreens={true}
      initialRouteName={settings.options.start_page}
      drawerContent={props => <DrawerContent {...props} />}
    >
      {initial_menu}
      <Drawer.Screen
        key="last"
        name="settings"
        component={SettingsStack}
        options={{ drawerLabel: "Настройки" }}
      />
    </Drawer.Navigator>
  );
}

export default AppNav = () => {
  return (
    <NavigationNativeContainer>
      <DrawerMenu />
    </NavigationNativeContainer>
  );
};
