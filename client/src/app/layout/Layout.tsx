import { Grid } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../features/navigationBar/Header";
import NavigationBar from "../../features/navigationBar/NavigationBar";

function Layout() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {!shouldHideHeader && <NavigationBar />}
      <Grid container>
        <Grid item xs={12} height="100%" minHeight="calc(100vh - 10.5rem)">
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default Layout;
