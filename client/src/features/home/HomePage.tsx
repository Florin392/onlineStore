import { Grid, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid container px={{ sm: 8, md: 10, lg: 6, xl: 28 }}>
      <Grid item xs={12}>
        <Slider {...settings}>
          <div>
            <img
              src="/images/hero1.jpg"
              alt="hero"
              style={{ display: "block", width: "100%", maxHeight: 500 }}
            />
          </div>
          <div>
            <img
              src="/images/hero2.jpg"
              alt="hero"
              style={{ display: "block", width: "100%", maxHeight: 500 }}
            />
          </div>
          <div>
            <img
              src="/images/hero3.jpg"
              alt="hero"
              style={{ display: "block", width: "100%", maxHeight: 500 }}
            />
          </div>
        </Slider>
      </Grid>
      <Grid container direction="column" textAlign="center" p={4}>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "24px", md: "42px" } }}
        >
          Welcome to my fake store
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "18px", md: "38px", color: "grey" } }}
        >
          work in progress
        </Typography>
      </Grid>
    </Grid>
  );
}
