import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import SliderComponent from "../menu/SliderComponent";
import useIsDesktop from "../../app/hooks/useIsDesktop";
import { Link } from "react-router-dom";
import { Category } from "../../state/catalog/types";
import { fetchCategoriesAsync } from "../../state/catalog/actions";
import { navStyles } from "../navigationBar/navStyles";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";

export default function MenuHomePage() {
  const categories = useAppSelector(
    (state) => state.catalog.categories
  ) as Category[];
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const isDesktop = useIsDesktop();

  const sliderRef = useRef<HTMLDivElement>(null);
  const leftMenuRef = useRef<HTMLDivElement>(null);

  const updateSliderHeight = useCallback(() => {
    if (sliderRef.current && leftMenuRef.current) {
      leftMenuRef.current.style.height = `${sliderRef.current.offsetHeight}px`;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategoriesAsync());
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => updateSliderHeight();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSliderHeight]);

  useEffect(() => {
    updateSliderHeight();
  }, [hoveredCategory, updateSliderHeight]);

  const handleCategoryHover = (category: Category) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  const getBorderStyles = (category: Category) => ({
    borderTop: hoveredCategory === category ? "1px solid lightgrey" : "none",
    borderBottom: hoveredCategory === category ? "1px solid lightgrey" : "none",
    borderRight: hoveredCategory !== category ? "1px solid lightgrey" : "none",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container style={{ height: "100%" }}>
      {isDesktop ? (
        <>
          <Grid
            item
            xs={3}
            component={Paper}
            ref={leftMenuRef}
            pt={2}
            style={{ height: "100%" }}
            onMouseLeave={handleCategoryLeave}
          >
            {categories.map((category) => (
              <Typography
                key={category.name}
                variant="subtitle2"
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  ...getBorderStyles(category),
                  paddingLeft: "20px",
                }}
                onMouseEnter={() => handleCategoryHover(category)}
              >
                {category.name}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={9} style={{ position: "relative" }}>
            <div ref={sliderRef} style={{ height: "100%" }}>
              <SliderComponent onHeightChange={updateSliderHeight} />
            </div>
            {hoveredCategory && hoveredCategory.subcategories && (
              <Paper
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  zIndex: 10,
                }}
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={handleCategoryLeave}
              >
                <List>
                  {hoveredCategory.subcategories.map((subcategory) => (
                    <ListItem
                      key={subcategory.id}
                      component={Link}
                      to={`/catalog/${subcategory.id}`}
                      style={{ ...navStyles }}
                    >
                      {subcategory.name}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <SliderComponent onHeightChange={updateSliderHeight} />
        </Grid>
      )}
    </Grid>
  );
}
