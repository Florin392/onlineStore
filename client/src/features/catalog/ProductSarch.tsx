import { TextField, debounce } from "@mui/material";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { setProductParams } from "../../state/catalog/slice";
import { useCallback, useState } from "react";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
    //  when we dispatch this action => setProductParams(slice)
    //   when we setProductParams, change the status of productsLoaded => false
    //   and then we pass  out action payload, in that case the searchTerm
    //   overwrite that part of state inside the productParams
    //   and the useEffect in Catalog run again and do not meet
    //   the condition because productsLoaded = false
    //   and we dispatch(fetchProductsAsync())
    //   actions(fetchProductsAsync) we're gona get the params
    //   and now we will have the searchTerm as well as all the other params
  }, 1000);

  const handleDebouncedSearch = useCallback(
    (event: any) => {
      setSearchTerm(event.target.value);
      debouncedSearch(event);
    },
    [debouncedSearch]
  );

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={handleDebouncedSearch}
    />
  );
}
