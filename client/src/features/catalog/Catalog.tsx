import React, { useCallback, useState } from "react";
import { Grid, Paper, Button } from "@mui/material";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import LoadingPage from "../../app/components/LoadingComponent";
import { setPageNumber, setProductParams } from "../../state/catalog/slice";
import ProductList from "./ProductList";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";
import useIsDesktop from "../../app/hooks/useIsDesktop";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
  const dispatch = useAppDispatch();
  const { products, brands, filtersLoaded, types, metaData } = useProducts();
  const { productParams } = useAppSelector((state) => state.catalog);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const isDesktop = useIsDesktop();

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

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };

  const applyFiltersAndHide = useCallback(() => {
    dispatch(setProductParams(productParams));
    setFiltersVisible(false);
  }, [dispatch, setFiltersVisible, productParams]);

  if (!filtersLoaded) return <LoadingPage message="Loading products..." />;

  return (
    <Grid container columnSpacing={4}>
      {isDesktop && (
        <Grid item xs={3}>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={handleSortingOrdeBy}
            />
          </Paper>
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
      )}

      {!isDesktop && (
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button variant="contained" onClick={toggleFiltersVisibility}>
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </Button>
        </Grid>
      )}

      {!isDesktop && filtersVisible && (
        <Grid item xs={12}>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={handleSortingOrdeBy}
            />
          </Paper>
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
          <Grid mb={2}>
            <Button variant="contained" onClick={applyFiltersAndHide}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} md={isDesktop ? 9 : 12}>
        <ProductList products={products} />
      </Grid>

      {products.length > 0 && (
        <Grid item xs={12} md={isDesktop ? 9 : 12} sx={{ mb: 2 }}>
          {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={handlePageChange}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
}
