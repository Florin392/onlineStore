import { Button, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    navigate("/contact");
  }, [navigate]);
  return (
    <Grid container>
      <Grid item xs={12} mt={5}>
        <Typography variant="h3" gutterBottom>
          About me
        </Typography>
      </Grid>
      <Grid item xs={12} py={4}>
        <Typography variant="h6">Hi!</Typography>
      </Grid>
      <Grid item xs={12} py={2}>
        <Typography variant="subtitle1">
          My name is Florin Iordache. I am a junior front-end developer with
          experience in React, Typescript,Redux, CSS and HTML. After almost two
          years of working in the field and three since first taking contact
          with this field I am searching for new challenges and way to improve
          my knowledge. I chose front-end because I am really good at
          visualising things and I discovered I enjoy creating products which
          bring a lot of value from UI/UX perspective. Since hard skills are
          something that a lot of people can learn easily I am also bringing a
          lot of passions that describe my personality even more than
          job-related abilities. I love hiking and nature and if you cannot
          reach me I am definitely on top of some mountain. I also enjoy running
          and cooking and I think that the best way to end a hard day is taking
          a long walk with my dog. That would be it. If you already checked my
          profile and consider I might be a good fit just drop an email!
        </Typography>
      </Grid>

      <Button variant="text" color="inherit" onClick={handleNavigate}>
        Contact me
      </Button>
    </Grid>
  );
}
