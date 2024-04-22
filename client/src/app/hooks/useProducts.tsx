import { useEffect } from "react";
import {
  fetchProductsAsync,
  fetchFiltersAsync,
} from "../../state/catalog/actions";
import { productSelectors } from "../../state/catalog/slice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export default function useProducts() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metaData } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData,
  };
}
