import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { currencyFormat, getImageUrl } from "../../app/helpers/utils";
import useProducts from "../../app/hooks/useProducts";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { removeProduct, setPageNumber } from "../../state/catalog/slice";
import ProductForm from "./ProductForm";
import { useCallback, useState } from "react";
import { Product } from "../../app/models/products";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const { products, metaData } = useProducts();
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setEditMode(true);
  }, []);

  const handleDeleteProduct = useCallback(
    (id: number) => {
      setLoading(true);
      setTarget(id);
      agent.Admin.deleteProduct(id)
        .then(() => dispatch(removeProduct(id)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    },
    [setLoading, dispatch]
  );

  const cancelEdit = useCallback(() => {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }, [selectedProduct]);

  const handleEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const handlePageChange = (page: number) =>
    dispatch(setPageNumber({ pageNumber: page }));

  if (editMode)
    return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={handleEditMode}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={getImageUrl(product.pictureUrl)}
                      alt={product.name}
                      style={{ height: 60, width: 60, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(product.price)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectProduct(product)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination metaData={metaData} onPageChange={handlePageChange} />
        </Box>
      )}
    </>
  );
}
