import { Box, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  const handleNavigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Grid container alignItems="center" justifyContent="center" >
      <Box sx={{ cursor: "pointer" }} onClick={handleNavigateHome}>
        <Typography variant="h4" gutterBottom>
          Online Store
        </Typography>
      </Box>
    </Grid>
  );
}
