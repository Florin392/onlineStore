import { createContext, ReactNode } from "react";
import { useDrawerToggle } from "../hooks/useDrawerToggle";

export const DrawerContext = createContext<any>(null);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const drawer = useDrawerToggle();

  return (
    <DrawerContext.Provider value={drawer}>{children}</DrawerContext.Provider>
  );
};
