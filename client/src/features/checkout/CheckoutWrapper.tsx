import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../../state/basket/slice";
import LoadingPage from "../../app/components/LoadingComponent";

const stripePromise = loadStripe(
  "pk_test_51P5m7OIK8MifvEPJbFmw4evKE5olsLCjNhgBe3Ne11foLMKLnnDxWVCkvrERxnRVl9a2qB2lfilAg15l3hzgUNdv00bUBrcvCn"
);

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingPage message="Loading checkout..." />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
