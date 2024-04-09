import { MetaData } from "../../app/models/pagination";
import { ProductParams } from "../../app/models/products";

export interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}
