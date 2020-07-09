import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Toggler } from "../../navigation/components/childs/Toggler";
import { AppContext } from "../../context/app/AppContext";
import { Switch } from "react-native-gesture-handler";
import { Appearance, useColorScheme } from "react-native-appearance";
import { VSwitch } from "../../core/fields/VSwitch";
import { language } from "../../core/language";

export const Settings = ({ navigation }) => {
  const { theme, settings } = useContext(AppContext);
  const systemTheme = useColorScheme();
  Appearance.getColorScheme();
  Toggler(navigation);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          textAlign: "left",
          width: "90%",
          color:
            theme === "dark"
              ? settings.options.dark_mode_color1
              : settings.options.light_mode_color1,
          margin: 10,
        }}
      >
        {language.theme_settings}
      </Text>
      <ThemeSwitcher
        title={language.theme_dark}
        numSwitch="1"
        themeValue="dark"
        secondViewStyle={{
          borderBottomWidth: 0.5,
          borderColor:
            theme === "dark"
              ? settings.options.dark_mode_color1
              : settings.options.light_mode_color1,
          padding: 5,
        }}
        style={{
          width: "100%",
          paddingLeft: 15,
        }}
      />

      <ThemeSwitcher
        title={language.theme_light}
        numSwitch="2"
        themeValue="light"
        secondViewStyle={{
          borderBottomWidth: 0.5,
          borderColor:
            theme === "dark"
              ? settings.options.dark_mode_color1
              : settings.options.light_mode_color1,
          padding: 5,
        }}
        style={{
          width: "100%",
          paddingLeft: 15,
        }}
      />

      <ThemeSwitcher
        title={language.theme_system}
        numSwitch="3"
        themeValue={systemTheme}
        secondViewStyle={{
          padding: 5,
        }}
        style={{
          width: "100%",
          paddingLeft: 15,
        }}
      />
    </View>
  );
};

export const ThemeSwitcher = ({
  title,
  numSwitch,
  themeValue,
  style,
  secondViewStyle,
}) => {
  const { setTheme, theme, settings, numThemeSwitch } = useContext(AppContext);
  const onChange = () => {
    if (numThemeSwitch !== numSwitch) {
      setTheme(numSwitch, themeValue);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onChange();
      }}
      style={[
        style,
        {
          backgroundColor:
            theme === "dark"
              ? settings.options.dark_mode_color4
              : settings.options.light_mode_color4,
        },
      ]}
    >
      <View
        style={[
          secondViewStyle,
          {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text
          style={{
            fontSize: 12,
            marginLeft: 5,

            color:
              theme === "dark"
                ? settings.options.dark_mode_color1
                : settings.options.light_mode_color1,
          }}
        >
          {title}
        </Text>
        <VSwitch
          wrapperStyle={{
            justifyContent: "space-between",
          }}
          containerStyle={{
            margin: 5,
            padding: 0,
            height: 20,
          }}
          value={numThemeSwitch === numSwitch}
          onChecked={() => {
            onChange();
          }}
          errors={{}}
          name={""}
          message={null}
          iconSize={16}
        />
      </View>
    </TouchableOpacity>
  );
};
