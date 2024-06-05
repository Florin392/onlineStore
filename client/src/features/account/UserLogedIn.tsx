import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { Link } from "react-router-dom";
import { signOut } from "../../state/account/slice";
import { clearBasket } from "../../state/basket/slice";
import { useCallback, useState } from "react";
import { AccountCircle } from "@mui/icons-material";

export default function UserLogedIn() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogOut = useCallback(() => {
    dispatch(clearBasket());
    dispatch(signOut());
  }, [dispatch]);

  return (
    <>
      <Button
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        sx={{ typography: "h6" }}
      >
        <AccountCircle />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          My orders
        </MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
}
