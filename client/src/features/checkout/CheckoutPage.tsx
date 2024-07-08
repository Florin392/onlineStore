import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import AddressForm from "./AddressForm";
import Review from "./Review";
import PaymentForm from "./PaymentForm";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import agent from "../../app/api/agent";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { clearBasket } from "../../state/basket/slice";
import { LoadingButton } from "@mui/lab";
import {
  fetchAddressAsync,
  saveAddressAsync,
} from "../../state/checkout/actions";
import {
  selectAddress,
  selectPayment,
  selectLoading,
} from "../../state/checkout/selectors";
import { setAddress, setLoading } from "../../state/checkout/slice";
import { Address } from "../../state/checkout/types";
import { validationSchema } from "./schema/checkoutValidation";

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectAddress);
  const payment = useAppSelector(selectPayment);
  const loading = useAppSelector(selectLoading);
  const [orderNumber, setOrderNumber] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [addressLoading, setAddressLoading] = useState(true);
  const currentValidationSchema = validationSchema[activeStep];
  const stripe = useStripe();
  const elements = useElements();

  const [cardState, setCardState] = useState({ elementError: {} });
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { basket } = useAppSelector((state) => state.basket);

  const onCardInputChange = useCallback((event: any) => {
    setCardState((prevState) => ({
      ...prevState,
      elementError: {
        ...prevState.elementError,
        [event.elementType]: event.error?.message,
      },
    }));
    setCardComplete((prevState) => ({
      ...prevState,
      [event.elementType]: event.complete,
    }));
  }, []);

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
    defaultValues: { ...address, ...payment },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      setAddressLoading(true);
      await dispatch(fetchAddressAsync());
      setAddressLoading(false);
    };
    fetchAddress();
  }, [dispatch]);

  useEffect(() => {
    if (address) {
      methods.reset({ ...address, ...payment });
    }
  }, [address, payment, methods]);

  const submitOrder = useCallback(
    async (data: FieldValues) => {
      dispatch(setLoading(true));
      const { nameOnCard, saveAddress, ...shippingAddress } =
        data as Address & { nameOnCard: string; saveAddress: boolean };
      if (!stripe || !elements) return;
      try {
        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) return;

        const paymentResult = await stripe.confirmCardPayment(
          basket?.clientSecret || "",
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: nameOnCard,
              },
            },
          }
        );

        if (paymentResult.paymentIntent?.status === "succeeded") {
          const orderNumber = await agent.Orders.create({
            saveAddress,
            shippingAddress,
          });
          setOrderNumber(orderNumber);
          setPaymentSucceeded(true);
          setPaymentMessage("Thank you - we have received your payment");
          setActiveStep(activeStep + 1);
          dispatch(clearBasket());

          if (saveAddress) {
            dispatch(setAddress({ ...shippingAddress, saveAddress })); // Save address to Redux
            await dispatch(
              saveAddressAsync({
                ...shippingAddress,
                saveAddress,
              })
            ); // Save address to server
          }
        } else {
          setPaymentMessage(
            paymentResult.error?.message ??
              "An error occurred during payment processing."
          );
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    },
    [stripe, elements, basket?.clientSecret, activeStep, dispatch]
  );

  const handleNext = useCallback(
    async (data: FieldValues) => {
      if (activeStep === steps.length - 1) {
        await submitOrder(data);
      } else {
        if (data.saveAddress) {
          await dispatch(saveAddressAsync(data as Address)); // Save address to server
        }
        dispatch(setAddress(data as Address)); // Save address to Redux
        setActiveStep(activeStep + 1);
      }
    },
    [activeStep, submitOrder, dispatch]
  );

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  const handleSubmitDisabled = useCallback(() => {
    if (activeStep === steps.length - 1) {
      return (
        !cardComplete.cardCvc ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardNumber ||
        !methods.formState.isValid
      );
    } else {
      return !methods.formState.isValid;
    }
  }, [activeStep, cardComplete, methods]);

  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {addressLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  {paymentMessage}
                </Typography>
                {paymentSucceeded ? (
                  <Typography variant="subtitle1">
                    Your order number is #{orderNumber}. We have not emailed
                    your order confirmation, and will not send you an update
                    when your order has shipped as this is a fake store!
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={handleBack}>
                    Go back and try again
                  </Button>
                )}
              </>
            ) : (
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep, cardState, onCardInputChange)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <LoadingButton
                    loading={loading}
                    disabled={handleSubmitDisabled()}
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </LoadingButton>
                </Box>
              </form>
            )}
          </>
        )}
      </Paper>
    </FormProvider>
  );
}

function getStepContent(step: number, cardState: any, onCardInputChange: any) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return (
        <PaymentForm
          cardState={cardState}
          onCardInputChange={onCardInputChange}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}
