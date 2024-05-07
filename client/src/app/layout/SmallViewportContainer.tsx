import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

function MemoizedSmallViewportContainer({ children }: { children: ReactNode }) {
  return (
    <Grid container flexDirection="column">
      <Grid alignSelf="center" maxWidth="42rem" width="100%">
        {children}
      </Grid>
    </Grid>
  );
}

const SmallViewportContainer = React.memo(MemoizedSmallViewportContainer);
export default SmallViewportContainer;
