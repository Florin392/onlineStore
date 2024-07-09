import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@mui/material";
import { ReactNode, useCallback, useState, createContext } from "react";

interface ThemeProviderType {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  breakpoints: any;
  darkMode: boolean;
  handleThemeChange: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeProvider({ children }: ThemeProviderType) {
  const [darkMode, setDarkMode] = useState(true);

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eeee" : "#121212",
      },
      primary: {
        main: paletteType === "light" ? "#1976d2" : "#90caf9",
      },
      text: {
        primary: paletteType === "light" ? "#000" : "#fff",
      },
    },
    breakpoints: {
      values: {
        xs: 0, // Extra-small devices (phones, 0px and up)
        sm: 768, // Small devices (phones, 600px and up)
        md: 960, // Medium devices (tablets, 960px and up)
        lg: 1280, // Large devices (desktops, 1280px and up)
        xl: 1920, // Extra-large devices (large desktops, 1920px and up)
      },
    },
  });

  const handleThemeChange = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const themeContextValue: ThemeContextType = {
    theme,
    darkMode,
    handleThemeChange,
    breakpoints: theme.breakpoints,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
