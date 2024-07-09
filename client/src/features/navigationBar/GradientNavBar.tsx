import { Grid } from "@mui/material";
import useIsDesktop from "../../app/hooks/useIsDesktop";

export default function GradientNavBar() {
  const isDesktop = useIsDesktop();

  return (
    <>
      {isDesktop ? (
        <Grid
          height="2rem"
          sx={{
            width: "100vw",
            position: "absolute",
            top: "4rem",
            zIndex: "-1",

            background:
              "linear-gradient(to right, #98FB98, #228B22)",
          }}
        />
      ) : (
        <Grid
          height=".3rem"
          sx={{
            width: "100vw",
            position: "absolute",
            top: "3rem",
            zIndex: "-1",
            background:
              "linear-gradient(to right, #98FB98, #228B22)",
          }}
        />
      )}
    </>
  );
}
