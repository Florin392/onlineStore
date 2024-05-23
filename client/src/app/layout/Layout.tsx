import { Grid } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
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
      <Grid container height="100%" minHeight="calc(100vh - 12rem)">
        <Outlet />
      </Grid>
      <Footer />
    </>
  );
}

export default Layout;
