import { Grid, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import LoadingPage from "../../app/layout/LoadingComponent";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
} from "../../state/catalog/actions";
import {
  productSelectors,
  setPageNumber,
  setProductParams,
} from "../../state/catalog/slice";
import ProductList from "./ProductList";
import { useEffect } from "react";
import ProductSearch from "./ProductSarch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  const handleSortingOrdeBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProductParams({ orderBy: e.target.value }));
  };

  const handleFilterByBrands = (items: string[]) => {
    dispatch(setProductParams({ brands: items }));
  };

  const handleFilterByTypes = (items: string[]) => {
    dispatch(setProductParams({ types: items }));
  };

  const handlePageChange = (page: number) =>
    dispatch(setPageNumber({ pageNumber: page }));

  if (!filtersLoaded) return <LoadingPage message="Loading products..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        {/*----------- Search field ----------- */}
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        {/*----------- Order by ----------- */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={handleSortingOrdeBy}
          />
        </Paper>

        {/*----------- Filers ----------- */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={handleFilterByBrands}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={handleFilterByTypes}
          />
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination metaData={metaData} onPageChange={handlePageChange} />
        )}
      </Grid>
    </Grid>
  );
}
