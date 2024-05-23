import { useContext } from "react";
import { DrawerContext } from "../providers/DrawerProvider";

export const useDrawer = () => useContext(DrawerContext);