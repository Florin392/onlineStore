import { Grid, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback } from "react";
import { useDrawer } from "../../app/hooks/useDrawerContext";
import useIsDesktop from "../../app/hooks/useIsDesktop";

export default function NavigationBar() {
  const isDesktop = useIsDesktop();
  const { handleDrawerToggle } = useDrawer();

  const handleMenuOpen = useCallback(() => {
    if (!isDesktop) {
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
          sx={{ backgroundColor: "#fff" }}
          px={1}
          height="2rem"
          alignItems="center"
          position="relative"
          bottom="-.5rem"
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
