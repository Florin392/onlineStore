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
              "-webkit-linear-gradient(right, #ff1d25 5%, #a0328c 35%, #7040a4 45%, #4359c7 55%, #0082e6 70%)",
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
              "-webkit-linear-gradient(right, #ff1d25 5%, #a0328c 35%, #7040a4 45%, #4359c7 55%, #0082e6 70%)",
          }}
        />
      )}
    </>
  );
}
