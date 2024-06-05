import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { currencyFormat } from "../../app/helpers/utils";
import {
  removeBasketItemAsync,
  addBasketItemAsync,
} from "../../state/basket/actions";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import useIsDesktop from "../../app/hooks/useIsDesktop";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}
export default function BasketTable({ items, isBasket = true }: Props) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                )}
                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                ${((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              {isBasket && (
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <>
      <Typography variant="h4" gutterBottom sx={{ paddingLeft: 1 }}>
        My basket
      </Typography>
      {items.map((item) => (
        <Grid container>
          <Grid
            component={Paper}
            container
            justifyContent="space-between"
            alignItems="center"
            p={2}
            mb={2}
            mx={1}
          >
            <Grid container xs={2} justifyContent="center">
              <img
                src={item.pictureUrl}
                alt={item.name}
                style={{ height: 70 }}
              />
            </Grid>

            <Grid container xs={10} alignSelf="start">
              <Grid item xs={12}>
                <Typography pl={2} gutterBottom>
                  Product name: {item.name}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid>
                  <Typography pl={2} gutterBottom variant="subtitle2">
                    Brand: {item.brand}
                  </Typography>
                  <Grid>
                    {isBasket && (
                      <LoadingButton
                        loading={
                          status ===
                          "pendingRemoveItem" + item.productId + "rem"
                        }
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: 1,
                              name: "rem",
                            })
                          )
                        }
                        color="error"
                      >
                        <Remove />
                      </LoadingButton>
                    )}
                    {item.quantity}
                    {isBasket && (
                      <LoadingButton
                        loading={status === "pendingAddItem" + item.productId}
                        onClick={() =>
                          dispatch(
                            addBasketItemAsync({ productId: item.productId })
                          )
                        }
                        color="secondary"
                      >
                        <Add />
                      </LoadingButton>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={4}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  alignSelf="end"
                >
                  <Typography>
                    Price: ${((item.price / 100) * item.quantity).toFixed(2)}
                  </Typography>

                  {isBasket && (
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId + "del"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: "del",
                          })
                        )
                      }
                      color="error"
                    >
                      <Typography>Delete</Typography>
                    </LoadingButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
