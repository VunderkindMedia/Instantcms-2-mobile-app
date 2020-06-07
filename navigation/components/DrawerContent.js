import { DrawerContentScrollView } from "@react-navigation/drawer";

import { Header } from "./childs/Header";

import { DrawerItems } from "./childs/DrawerItems";
import React from "react";
import { AuthState } from "../../context/auth/AuthState";

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <AuthState>
        <Header />
      </AuthState>
      <DrawerItems {...props} />
    </DrawerContentScrollView>
  );
}
