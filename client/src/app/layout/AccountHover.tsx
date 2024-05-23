import { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { navStyles } from "../../features/navigationBar/navStyles";

export default function AccountHover() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate("/login");
  };
  const open = Boolean(anchorEl);

  return (
    <Grid container alignItems="center">
      <div
        style={{ position: "relative" }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <IconButton sx={navStyles} size="medium">
          <AccountCircle />
        </IconButton>

        <Menu
          id="hover-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <Grid height="5rem">
              <Typography>
                Please login into your Account to have full access!
              </Typography>
              <Grid container alignItems="center" xs={8}>
                <Grid item xs={3}>
                  <Button variant="contained" onClick={handleClose}>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={3} paddingLeft={2} p={2}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </MenuItem>
        </Menu>
      </div>
      {/* </div> */}
    </Grid>
  );
}
