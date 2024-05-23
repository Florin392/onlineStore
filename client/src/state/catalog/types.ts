import { MetaData } from "../../app/models/pagination";
import { ProductParams } from "../../app/models/products";

export interface Subcategory {
  id: number;
  name: string;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  categories: Category[];
  productParams: ProductParams;
  metaData: MetaData | null;
}
