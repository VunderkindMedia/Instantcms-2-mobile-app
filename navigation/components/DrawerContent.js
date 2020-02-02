import { DrawerContentScrollView } from "@react-navigation/drawer";

import { Header } from "./childs/Header";

import { DrawerItems } from "./childs/DrawerItems";
import React from "react";

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Header />
      <DrawerItems {...props} />
    </DrawerContentScrollView>
  );
}
