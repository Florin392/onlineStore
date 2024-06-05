import { Button, Grid, Typography, Box } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { basketSelector } from "../../state/basket/selectors";
import BasketTable from "./BasketTable";
import { useCallback } from "react";

export default function BasketPage() {
  const basket = useAppSelector(basketSelector);
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => navigate("/catalog"), [navigate]);
  return (
    <>
      {basket && basket.items.length > 0 ? (
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <BasketTable items={basket.items} />
            </Grid>
            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={6} mt={{ xs: 2, md: 0 }}>
              <BasketSummary />
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                size="large"
                fullWidth
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Grid padding={2}>
          <Typography variant="h3" gutterBottom>
            Your basket is empty
          </Typography>
          <Button variant="contained" onClick={handleNavigate}>
            Go back to catalog
          </Button>
        </Grid>
      )}
    </>
  );
}
