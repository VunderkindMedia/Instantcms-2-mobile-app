import React, { useContext } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationNativeContainer } from "@react-navigation/native";
import { MemoList } from "../screens/content/List";
import { Item } from "../screens/content/Item";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "../context/app/AppContext";
import DrawerContent from "./components/DrawerContent";
import { Settings } from "../screens/content/Settings";
import { SignIn } from "../screens/Auth/SighIn";

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
      <Stack.Screen
        name={route.name}
        component={MemoList}
        initialParams={{ ctype: route.params.ctype }}
        options={{ title: route.params.title }}
      />
      <Stack.Screen name={route.name + "Item"} component={Item} />
    </Stack.Navigator>
  );
}

export function SettingsStack({ route }) {
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

export function AuthStack({ route }) {
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
  const { settings } = useContext(AppContext);
  var initial_menu = [];

  for (id in settings.menu) {
    if (
      settings.menu[id].url.split("*")[0] === "auth" &&
      settings.menu[id].is_enabled === "1"
    ) {
      initial_menu = [
        <Drawer.Screen
          key={id}
          name={settings.menu[id].url.split("*")[0]}
          component={AuthStack}
          initialParams={{ title: "Авторизация" }}
          options={{
            drawerLabel: settings.menu[id].title,
            drawerIcon: settings.menu[id].options.class
          }}
        />,
        ...initial_menu
      ];
    } else {
      if (settings.menu[id].is_enabled === "1") {
        initial_menu = [
          ...initial_menu,
          <Drawer.Screen
            key={id}
            name={settings.menu[id].url.split("*")[0]}
            component={ContentStack}
            options={{
              drawerLabel: settings.menu[id].title,
              drawerIcon: settings.menu[id].options.class
            }}
            initialParams={{
              ctype: settings.menu[id].url.split("*")[0],
              title: settings.menu[id].title
            }}
          />
        ];
      }
    }
  }

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 240
      }}
      // unmountInactiveScreens={true}
      initialRouteName={settings.options.start_page}
      drawerContent={props => <DrawerContent {...props} />}
    >
      {initial_menu}
      <Drawer.Screen
        key="last"
        name="settings"
        component={SettingsStack}
        initialParams={{ title: "Настройки" }}
        options={{
          drawerLabel: "Настройки",
          drawerIcon: "build"
        }}
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
