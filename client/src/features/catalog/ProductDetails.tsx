import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormat } from "../../app/helpers/utils";
import NotFound from "../../app/errors/NotFound";
import LoadingPage from "../../app/components/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { basketSelector, statusSelector } from "../../state/basket/selectors";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../../state/basket/actions";
import { productSelectors } from "../../state/catalog/slice";
import { fetchProductAsync } from "../../state/catalog/actions";

export default function ProductDetails() {
  const navigate = useNavigate();
  const basket = useAppSelector(basketSelector);
  const status = useAppSelector(statusSelector);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id!))
  );

  const [quantity, setQuantity] = useState<number | string>(0);

  const item = useMemo(() => {
    return basket?.items.find((i) => i.productId === product?.id);
  }, [basket, product]);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [item, product, dispatch, id]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      if (value === "" || parseInt(value) >= 0) {
        setQuantity(value === "" ? "" : parseInt(value));
      }
    },
    []
  );

  const handleUpdateCart = useCallback(() => {
    if (!product) return;

    const currentQuantity = typeof quantity === "string" ? parseInt(quantity) : quantity;
    const itemQuantity = item ? item.quantity : 0;
    const updatedQuantity = currentQuantity - itemQuantity;

    if (updatedQuantity > 0) {
      dispatch(
        addBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      dispatch(
        removeBasketItemAsync({
          productId: product.id,
          quantity: Math.abs(updatedQuantity),
        })
      );
    }
  }, [item, product, quantity, dispatch]);

  const handleGoBack = useCallback(() => {
    navigate("/catalog");
  }, [navigate]);

  if (productStatus.includes("pending"))
    return <LoadingPage message="Loading product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 6 }}
      direction={{ xs: "column", md: "row" }}
      paddingTop={2}
    >
      <Grid item xs={4} mx={2}>
        <Grid>
          <LoadingButton onClick={handleGoBack}>Go back</LoadingButton>
        </Grid>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "300px", height: "300px", objectFit: "cover" }}
        />
      </Grid>

      <Grid item xs={12} md={6} mx={2}>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5" color="secondary" gutterBottom>
          {currencyFormat(product.price)}
        </Typography>

        <TableContainer>
          <Table sx={{ backgroundColor: "rgb(247, 247, 247)" }}>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={4} md={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={8} md={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || (!item && quantity === 0)}
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
