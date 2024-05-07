import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { basketSelector } from "../../state/basket/selectors";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const basket = useAppSelector(basketSelector);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <Grid container xs={12} px={{ sm: 4, md: 10, lg: 6, xl: 12 }}>
      <BasketTable items={basket.items} />
      <Grid container xs={12}>
        <Grid item xs={0} md={6} />
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
    </Grid>
  );
}
