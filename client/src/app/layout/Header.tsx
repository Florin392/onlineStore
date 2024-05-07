import { InventoryRounded, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Grid,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { basketSelector } from "../../state/basket/selectors";
import SignedInMenu from "./SignedInMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { navStyles } from "./navStyles";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { useState } from "react";
import AccountHover from "./AccountHover";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
  window?: () => Window;
}
const drawerWidth = 240;

export default function Header({ window, darkMode, handleThemeChange }: Props) {
  const basket = useAppSelector(basketSelector);
  const { user } = useAppSelector((state) => state.account);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // calculate all quantity and update basket icon
  const itemCount = basket?.items.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar position="static">
        <div style={{ position: "relative", textAlign: "right" }}></div>

        <Grid
          container
          xs={12}
          px={{ xs: 2, sm: 8, md: 10, lg: 6, xl: 28 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            Online Store
          </Typography>

          <Grid container item xs={8} alignItems="center" justifyContent="end">
            {user && user.roles?.includes("Admin") && (
              <IconButton component={NavLink} to={"/inventory"} sx={navStyles}>
                <InventoryRounded />
              </IconButton>
            )}

            <Grid item justifyContent="center">
              {user ? <SignedInMenu /> : <AccountHover />}
            </Grid>

            <IconButton
              component={Link}
              to="/basket"
              size="large"
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
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>

      {/* Drawer menu for mobile */}
      <Grid container alignItems="right">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          anchor="right"
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <MobileMenuDrawer
            darkMode={darkMode}
            handleThemeChange={handleThemeChange}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      </Grid>
    </>
  );
}
