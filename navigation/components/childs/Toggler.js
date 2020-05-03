import React, { useContext } from "react";
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../../../context/app/AppContext";

export const Toggler = (navigation) => {
    const {
        settings
    } = useContext(AppContext);
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()} >
                <Ionicons

                    name="ios-menu"
                    size={24}
                    style={{ marginRight: 35, marginLeft: 15, marginVertical: 10 }}
                    color={settings.options.main_color}
                />
            </TouchableOpacity>
        ),
    });
}