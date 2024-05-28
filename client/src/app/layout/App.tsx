import { useCallback, useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../components/LoadingComponent";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchCurrentUserAsync } from "../../state/account/actions";
import { fetchBasketAsync } from "../../state/basket/actions";
import ThemeProvider from "../providers/ThemeProvider";
import { DrawerProvider } from "../providers/DrawerProvider";
import GradientNavBar from "../../features/navigationBar/GradientNavBar";
import useIsDesktop from "../hooks/useIsDesktop";

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
          </>
        )}
      </DrawerProvider>
    </ThemeProvider>
  );
}
