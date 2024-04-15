import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P5m7OIK8MifvEPJbFmw4evKE5olsLCjNhgBe3Ne11foLMKLnnDxWVCkvrERxnRVl9a2qB2lfilAg15l3hzgUNdv00bUBrcvCn"
);

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
