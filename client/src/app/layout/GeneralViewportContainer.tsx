import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

function MemoizedGeneralViewportContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Grid
      position={{ md: "fixed" }}
      width={{ md: "calc(35vw + 1rem)", lg: "calc(30vw + 1rem)" }}
      left={{ md: "calc(5vw - 1rem)", lg: "calc(10vw - 1rem)" }}
      minHeight={{ md: "calc(100vh - 7rem)" }}
    >
      <Grid
        container
        height="100%"
        marginBottom="auto"
        minHeight="calc(100vh - 7rem)"
        flexDirection="column"
      >
        {children}
      </Grid>
    </Grid>
  );
}

const GeneralViewportContainer = React.memo(MemoizedGeneralViewportContainer);
export default GeneralViewportContainer;
