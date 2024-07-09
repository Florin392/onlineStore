import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoriesAsync,
  fetchFiltersAsync,
  fetchProductAsync,
  fetchProductsAsync,
} from "./actions";
import { Product } from "../../app/models/products";
import { RootState } from "../store";
import { CatalogState } from "./types"; 

const productsAdapter = createEntityAdapter<Product>();

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
    brands: [],
    types: [],
  };
}

const initialState: CatalogState = {
  productsLoaded: false,
  filtersLoaded: false,
  status: "idle",
  brands: [],
  types: [],
  categories: [], 
  productParams: initParams(),
  metaData: null,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState(initialState),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
    setProduct: (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.productsLoaded = false;
    },
    removeProduct: (state, action) => {
      productsAdapter.removeOne(state, action.payload);
      state.productsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });

    builder.addCase(fetchCategoriesAsync.pending, (state) => {
      state.status = "pendingFetchCategories";
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  setPageNumber,
  setMetaData,
  resetProductParams,
  setProduct,
  removeProduct,
} = catalogSlice.actions;
