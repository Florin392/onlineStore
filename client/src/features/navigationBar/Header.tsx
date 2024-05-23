import {
  InventoryRounded,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Grid,
  Drawer,
  IconButton,
  Typography,
  Hidden,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { basketSelector } from "../../state/basket/selectors";
import { navStyles } from "../../features/navigationBar/navStyles";
import ProductSearch from "../../features/catalog/ProductSarch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useDrawer } from "../../app/hooks/useDrawerContext";
import AccountHover from "../../app/layout/AccountHover";
import SignedInMenu from "../../app/layout/SignedInMenu";
import MobileMenuDrawer from "../menu/MobileMenuDrawer";
import useIsDesktop from "../../app/hooks/useIsDesktop";

const drawerWidth = 240;

export default function Header() {
  const basket = useAppSelector(basketSelector);
  const { user } = useAppSelector((state) => state.account);
  const { mobileOpen, handleDrawerToggle } = useDrawer();

  const itemCount = basket?.items.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  const isDesktop = useIsDesktop();

  return (
    <>
      <AppBar position="static" style={{ height: isDesktop ? "4rem" : "3rem" }}>
        <Grid
          container
          item
          xs={12}
          px={2}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
        >
          {/* Logo */}
          <Grid item xs={6} md={4}>
            <Typography
              component={NavLink}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                typography: isDesktop ? "h4" : "h6",
                "&:hover": { color: "blue.600" },
                "&.active": { color: "text.secondary" },
              }}
            >
              Online Store
            </Typography>
          </Grid>

          {isDesktop ? (
            <Grid item md={8} flexGrow={1}>
              <ProductSearch />
            </Grid>
          ) : null}

          {/* Right side of appbar */}
          <Grid
            container
            xs={7}
            sm={6}
            md={3}
            alignItems="center"
            justifyContent="end"
            mr={{ xs: 0, md: 2 }}
          >
            <Grid item justifyContent="center">
              {user ? <SignedInMenu /> : <AccountHover />}
            </Grid>

            {isDesktop && user?.roles?.includes("Admin") ? (
              <IconButton component={NavLink} to="/inventory" sx={navStyles}>
                <InventoryRounded />
              </IconButton>
            ) : null}

            <IconButton
              component={Link}
              to="/basket"
              size="medium"
              edge="end"
              color="inherit"
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              size="medium"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginLeft: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>

      <Hidden mdUp>
        <Grid item flexGrow={1} marginY={2} px={{ xs: 1, sm: 8 }}>
          {user?.roles?.includes("Admin") ? (
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={10}>
                <ProductSearch />
              </Grid>
              <Grid container xs={2} justifyContent="end">
                <IconButton component={NavLink} to="/inventory" sx={navStyles}>
                  <InventoryRounded />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={10}>
              <ProductSearch />
            </Grid>
          )}
        </Grid>
      </Hidden>

      {/* Drawer menu for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        anchor={isDesktop ? "left" : "right"}
        sx={{
          display: { xs: "block", sm: "lg" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <MobileMenuDrawer handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </>
  );
}
