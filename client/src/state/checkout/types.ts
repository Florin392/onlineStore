export interface Address {
  id?: number;
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  saveAddress?: boolean;
}

export interface Payment {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface CheckoutState {
  address: Address | null;
  payment: Payment | null;
  loading: boolean;
  error: string | null;
}
