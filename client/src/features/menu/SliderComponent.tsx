import { Grid, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";
import useIsDesktop from "../../app/hooks/useIsDesktop";

interface SliderComponentProps {
  onHeightChange?: () => void;
}

export default function SliderComponent({
  onHeightChange,
}: SliderComponentProps) {
  const isDesktop = useIsDesktop();

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          display: "block",
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <ArrowBackIos />
      </IconButton>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          display: "block",
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    );
  };

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    afterChange: () => {
      if (onHeightChange) {
        onHeightChange();
      }
    },
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          right: "10px",
          bottom: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: isDesktop ? "flex-end" : "center",
        }}
      >
        <ul style={{ margin: isDesktop ? "0 20px " : "5px" }}> {dots} </ul>
      </div>
    ),
  };

  const images = [
    { src: "/images/slider3.jpg", alt: "slider3" },
    { src: "/images/slider2.jpg", alt: "slider2" },
    { src: "/images/slider1.jpg", alt: "slider1" },
  ];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Grid item xs={12} sx={{ width: "100%", margin: "0 auto" }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <Grid
              container
              key={index}
              justifyContent="center"
              alignItems="center"
              sx={{ position: "relative" }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
}
