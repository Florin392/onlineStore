import { Basket } from "../../app/models/basket";

export interface BasketState {
  basket: Basket | null;
  status: string;
}
