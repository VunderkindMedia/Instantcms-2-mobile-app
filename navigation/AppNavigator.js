import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
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
import { Comments } from "../screens/Comments/Comments";
import { Remember } from "../screens/Auth/Remember";
import { WebViewOn } from "../screens/WebViewOn";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainStack({ navigation, route }) {
  const { settings } = useContext(AppContext);
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={route.params.screen}
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
      <Stack.Screen
        name={"Remember"}
        component={Remember}
        options={{ title: "Восстановление пароля" }}
      />

      <Stack.Screen
        name={"Comments"}
        component={Comments}
        mode="modal"
        options={{
          title: "Комментарии",
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"Settings"}
        component={Settings}
        options={{ title: "Настройки" }}
      />
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

function DrawerMenu() {
  const { settings } = useContext(AppContext);
  var initial_menu = [];
  let reorder_menu = { menu: {} };

  Object.keys(settings.menu)
    .sort(function (a, b) {
      return settings.menu[a].ordering - settings.menu[b].ordering;
    })
    .forEach(function (v) {
      if (settings.menu[v].is_enabled === "1") {
        initial_menu.push(
          <Drawer.Screen
            key={v}
            name={settings.menu[v].url}
            component={MainStack}
            options={{
              drawerLabel: settings.menu[v].title,
              drawerIcon: settings.menu[v].options.class,
              unmountOnBlur: true,
            }}
            initialParams={{
              screen: "List",
              url: settings.menu[v].url,
              title: settings.menu[v].title,
            }}
          />
        );
      }
    });

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
          component={MainStack}
          initialParams={{
            title: "Авторизация",
            screen: "SignIn",
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
        component={MainStack}
        initialParams={{
          title: "Настройки",
          screen: "Settings",
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
  const linking = {
    prefixes: ["https://mychat.com", "mychat://"],
    config: {
      screens: {
        Comments: "comments",
      },
    },
  };
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
  if (settings.options.webview_on) {
    return <WebViewOn />;
  } else {
    return (
      <NavigationContainer
        linking={linking}
        fallback={<Text>Loading...</Text>}
        theme={theme === "dark" ? darkTheme : defaultTheme}
      >
        <DrawerMenu />
      </NavigationContainer>
    );
  }
};
