import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
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
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toLowerCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status === "pendingAddItem" + product.id}
          onClick={handleAddItem}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
