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
import { navStyles } from "../../features/navigationBar/navStyles";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../app/hooks/useTheme";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

interface Props {
  handleDrawerToggle: () => void;
}

export default function MobileMenuDrawer({ handleDrawerToggle }: Props) {
  const { darkMode, handleThemeChange } = useTheme();

  return (
    <Grid container textAlign="center" py={1}>
      <Grid container justifyContent="end" alignItems="center" pr={4}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
      <Grid item xs={12} textAlign="right">
        {midLinks.map(({ title, path }) => (
          <ListItem
            key={path}
            component={NavLink}
            to={path}
            disablePadding
            sx={navStyles}
            onClick={handleDrawerToggle}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={title.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
        <Grid container item xs={12} alignItems="center">
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
