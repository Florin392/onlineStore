import { GitHub, LinkedIn } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";

function Footer() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={{ xs: "center", sm: "end" }}
      pr={{ xs: 0, sm: 5 }}
    >
      <IconButton
        component="a"
        href="https://www.linkedin.com/in/florin-iordache-2b998b166/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedIn />
      </IconButton>
      <IconButton
        component="a"
        href="https://github.com/Florin392"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
      </IconButton>
      <Typography variant="caption">
        COPYRIGHT 2024 © Florin Iordache
      </Typography>
    </Grid>
  );
}

export default Footer;
