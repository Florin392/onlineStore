import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { navStyles } from "./navStyles";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
  handleDrawerToggle: () => void;
}

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

export default function MobileMenuDrawer({
  darkMode,
  handleThemeChange,
  handleDrawerToggle,
}: Props) {
  return (
    <Grid container textAlign="center" paddingY={1}>
      <Grid
        container
        item
        xs={12}
        justifyContent="end"
        alignItems="end"
        mr={{ xs: 2, sm: 8 }}
        ml={{ xs: 2, sm: 4 }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider variant="fullWidth" />
      <Grid item xs={12} textAlign="right">
        {midLinks.map(({ title, path }) => (
          <ListItem
            key={path}
            component={NavLink}
            to={path}
            disablePadding
            sx={navStyles}
          >
            <ListItemButton
              sx={{
                textAlign: "center",
              }}
            >
              <ListItemText primary={title.toLocaleUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
        <Grid container xs={12} alignItems="center">
          <Grid item xs={8}>
            <Typography>Dark Mode</Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch checked={darkMode} onChange={handleThemeChange} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
