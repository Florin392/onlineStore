import { useCallback, useEffect, useState } from "react";
import { Container, CssBaseline, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "./app/components/LoadingComponent";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import useIsDesktop from "./app/hooks/useIsDesktop";
import { DrawerProvider } from "./app/providers/DrawerProvider";
import GradientNavBar from "./features/navigationBar/GradientNavBar";
import { fetchCurrentUserAsync } from "./state/account/actions";
import { fetchBasketAsync } from "./state/basket/actions";
import ThemeProvider from "./app/providers/ThemeProvider";
import Footer from "./app/layout/Footer";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const isDesktop = useIsDesktop();

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUserAsync());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <ThemeProvider>
      <DrawerProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline />
        {loading ? (
          <LoadingPage message="Initialising app..." />
        ) : (
          <>
            <GradientNavBar />
            <Container sx={{ paddingX: isDesktop ? "auto" : "0" }}>
              <Outlet />
            </Container>
            <Grid container justifySelf="end" >
              <Footer />
            </Grid>
          </>
        )}
      </DrawerProvider>
    </ThemeProvider>
  );
}
