import { Grid, Typography, styled } from "@mui/material";

const StyledLink = styled("a")`
  color: inherit;
  text-decoration: none;
`;

export default function ContactPage() {
  return (
    <Grid container>
      <Grid item xs={12} mt={5}>
        <Typography variant="h1" gutterBottom>
          Hello.
        </Typography>
      </Grid>

      <Grid item xs={12} py={4}>
        <Typography variant="body1" gutterBottom>
          Need a front-end developer to build your website? Get in touch.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">
          Email:
          <StyledLink
            href="mailto:iordacheflorin3@yahoo.com"
            style={{ margin: "0 5px" }}
          >
            iordacheflorin3@yahoo.com
          </StyledLink>
        </Typography>
        <Typography variant="body1">
          You can find me:
          <StyledLink
            href="https://www.linkedin.com/in/florin-iordache-2b998b166/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 5px" }}
          >
            LinkedIn
          </StyledLink>
          /
          <StyledLink
            href="https://github.com/Florin392"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 5px" }}
          >
            GitHub
          </StyledLink>
        </Typography>
        <Typography></Typography>
      </Grid>
    </Grid>
  );
}
