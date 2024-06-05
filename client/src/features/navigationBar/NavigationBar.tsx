import { Grid, Typography, IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback } from "react";
import { useDrawer } from "../../app/hooks/useDrawerContext";
import useIsDesktop from "../../app/hooks/useIsDesktop";

export default function NavigationBar() {
  const isDesktop = useIsDesktop();
  const { handleDrawerToggle } = useDrawer();
  const theme = useTheme();

  const paletteType = theme.palette.mode;
  const isLightMode = paletteType === "light";

  const handleMenuOpen = useCallback(() => {
    if (isDesktop) {
      handleDrawerToggle();
    }
  }, [handleDrawerToggle, isDesktop]);

  return (
    <>
      {isDesktop ? (
        <Grid
          container
          width="10rem"
          flexWrap="nowrap"
          sx={{
            backgroundColor: isLightMode ? "#ffffff" : "#121212",
          }}
          px={1}
          height="2rem"
          alignItems="center"
          borderRadius="15px 15px 0 0 "
        >
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography paddingLeft={1}>Products</Typography>
        </Grid>
      ) : null}
    </>
  );
}
