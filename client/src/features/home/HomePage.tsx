import { Grid, Typography } from "@mui/material";
import MenuHomePage from "./MenuHomePage";
import useIsDesktop from "../../app/hooks/useIsDesktop";

export default function HomePage() {
  const isDektop = useIsDesktop();

  return (
    <Grid container height="100%">
      <Grid item xs={12}>
        <MenuHomePage />
      </Grid>
      <Grid item xs={12} textAlign="center" py={{ xs: 2, md: 4 }}>
        <Typography
          variant="body1"
          sx={{ fontSize: isDektop ? "42px" : "24px" }}
        >
          Welcome to my fake store
        </Typography>
        <Typography
          sx={{ fontSize: isDektop ? "38px" : "18px", color: "grey" }}
        >
          work in progress...
        </Typography>
      </Grid>
    </Grid>
  );
}
