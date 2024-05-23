import { useState } from "react";

export const useDrawerToggle = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return {
    mobileOpen,
    handleDrawerToggle,
  };
};
