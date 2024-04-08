import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import LoadingPage from "../../app/layout/LoadingComponent";
import { fetchProductsAsync } from "../../state/catalog/actions";
import { productSelectors } from "../../state/catalog/slice";
import ProductList from "./ProductList";
import { useEffect } from "react";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded,status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  if (status.includes("pendingFetchProducts"))
    return <LoadingPage message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
