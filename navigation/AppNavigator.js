import React, { useContext } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { List } from "../screens/content/List";
import { Item } from "../screens/content/Item";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { AppContext } from "../context/app/AppContext";
import DrawerContent from "./components/DrawerContent";
import { Counters } from "../screens/counters/Counters";
import { Counter } from "../screens/counters/Counter";
import { Settings } from "../screens/content/Settings";
import { Categories } from "../screens/content/Categories";
import { Filter } from "../screens/content/Filter";
import { SignIn } from "../screens/Auth/SighIn";
import { SignUp } from "../screens/Auth/SignUp.js";
import { Animated } from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ContentStack({ navigation, route }) {
  const { settings } = useContext(AppContext);
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: settings.options.main_color,
      }}
    >
      <Stack.Screen
        name={"List"}
        component={List}
        initialParams={{ ctype: route.params.url }}
        options={{
          title: route.params.title,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"Item"}
        component={Item}
        options={{
          title: route.params.title,

          // cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"Categories"}
        component={Categories}
        mode="modal"
        options={{
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"Filter"}
        component={Filter}
        mode="modal"
        options={{
          // cardStyleInterpolator: forFade,

          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          gestureResponseDistance: { vertical: 1000 },
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
}

export function SettingsStack({ route }) {
  const { settings } = useContext(AppContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: settings.options.main_color,
      }}
    >
      <Stack.Screen
        name={"Settings"}
        component={Settings}
        options={{ title: "Настройки" }}
      />
    </Stack.Navigator>
  );
}

export function CountersStack({ route }) {
  const { settings } = useContext(AppContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: settings.options.main_color,
      }}
    >
      <Stack.Screen
        name={"Counters"}
        component={Counters}
        options={{ title: "Показания счетчиков" }}
      />
      <Stack.Screen
        name={"Counter"}
        component={Counter}
        options={{ title: "Показания счетчика" }}
      />
    </Stack.Navigator>
  );
}

export function AuthStack({ route }) {
  const { settings } = useContext(AppContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: settings.options.main_color,
      }}
    >
      <Stack.Screen
        name={"SignIn"}
        component={SignIn}
        options={{ title: "Авторизация" }}
      />
      <Stack.Screen
        name={"SignUp"}
        component={SignUp}
        options={{ title: "Регистрация" }}
      />
    </Stack.Navigator>
  );
}

function DrawerMenu() {
  const { settings } = useContext(AppContext);
  var initial_menu = [];

  for (var id in settings.menu) {
    if (settings.menu[id].is_enabled === "1") {
      initial_menu.push(
        <Drawer.Screen
          key={id}
          name={settings.menu[id].url}
          component={ContentStack}
          options={{
            drawerLabel: settings.menu[id].title,
            drawerIcon: settings.menu[id].options.class,
            unmountOnBlur: true,
          }}
          initialParams={{
            url: settings.menu[id].url,
            title: settings.menu[id].title,
          }}
        />
      );
    }
  }

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 240,
      }}
      initialRouteName={settings.options.start_page}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {!settings.user_info.date_log && (
        <Drawer.Screen
          key={"first"}
          name={"auth"}
          component={AuthStack}
          initialParams={{
            title: "Авторизация",
          }}
          options={{
            drawerLabel: "Авторизация",
            drawerIcon: "person",
          }}
        />
      )}
      {initial_menu}
      {/* <Drawer.Screen
        key="countersStack"
        name="CounterStack"
        component={CountersStack}
        initialParams={{
          title: "Показания счетчиков",
        }}
        options={{
          unmountOnBlur: true,
          drawerLabel: "Показания счетчиков",
          drawerIcon: "build",
        }}
      /> */}
      <Drawer.Screen
        key="last"
        name="settings"
        component={SettingsStack}
        initialParams={{
          title: "Настройки",
        }}
        options={{
          unmountOnBlur: true,
          drawerLabel: "Настройки",
          drawerIcon: "build",
        }}
      />
    </Drawer.Navigator>
  );
}

export const AppNav = ({}) => {
  const { theme, settings } = useContext(AppContext);
  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: settings.options.dark_mode_color3,
      card: settings.options.dark_mode_color2,
      border: settings.options.dark_mode_color2,
      background: settings.options.dark_mode_color2,
    },
  };

  const defaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: settings.options.light_mode_color3,
      card: settings.options.light_mode_color2,
      border: settings.options.light_mode_color2,
      background: settings.options.light_mode_color2,
    },
  };
  return (
    <NavigationContainer theme={theme === "dark" ? darkTheme : defaultTheme}>
      <DrawerMenu />
    </NavigationContainer>
  );
};
