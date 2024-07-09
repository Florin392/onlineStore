import { Grid, Typography } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  if (!productsLoaded) {
    return (
      <Grid container spacing={2}>
        {Array.from(new Array(6)).map((_, index) => (
          <Grid item xs={6} md={4} key={index}>
            <ProductCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (products.length === 0) {
    return (
      <Typography
        variant="h6"
        component="div"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        No products found
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={5} md={4} mx={{ xs: 2, md: 0 }} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
