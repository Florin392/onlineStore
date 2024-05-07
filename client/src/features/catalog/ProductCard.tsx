import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/products";
import { currencyFormat } from "../../app/helpers/utils";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { addBasketItemAsync } from "../../state/basket/actions";
import { statusSelector } from "../../state/basket/selectors";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const status = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();

  const handleAddItem = useCallback(() => {
    dispatch(addBasketItemAsync({ productId: product.id }));
  }, [dispatch, product.id]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        "&:hover": {
          boxShadow: "0 12px 12px rgba(0,0,0,0.4)",
        },
      }}
    >
      <Grid>
        <Grid
          component={Link}
          to={`/catalog/${product.id}`}
          sx={{ textDecoration: "none" }}
        >
          <CardHeader
            sx={{ height: 100 }}
            avatar={
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                {product.name ? product.name.charAt(0).toUpperCase() : ""}
              </Avatar>
            }
            subheader={
              <Typography variant="subtitle1" color="primary.main" gutterBottom>
                {product.name}
              </Typography>
            }
          />

          <CardMedia
            sx={{
              height: { xs: 150, md: 250 },
              backgroundSize: "contain",
              bgcolor: "primary.light",
            }}
            image={product.pictureUrl}
            title={product.name}
          />
          <CardContent>
            <Grid>
              <Typography color="text.primary" gutterBottom>
                {currencyFormat(product.price)}
              </Typography>
              <Typography color="text.secondary">
                {product.brand} / {product.type}
              </Typography>
            </Grid>
          </CardContent>
        </Grid>
        <CardActions>
          <LoadingButton
            loading={status === "pendingAddItem" + product.id}
            onClick={handleAddItem}
            size="small"
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
          >
            Add to Cart
          </LoadingButton>
        </CardActions>
      </Grid>
    </Card>
  );
}
