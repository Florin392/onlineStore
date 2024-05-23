import { Button, Grid, Typography, Box } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { basketSelector } from "../../state/basket/selectors";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const basket = useAppSelector(basketSelector);

  if (!basket || basket.items.length === 0) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  return (
    <Box px={{ sm: 4, md: 10, lg: 6, xl: 12 }}>
      <Grid container spacing={2}>
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
  );
}
