import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { StripeInput } from "./StripeInput";
import { StripeElementType } from "@stripe/stripe-js";

interface Props {
  cardState: {
    elementError: { [key in StripeElementType]?: string };
  };
  onCardInputChange: (event: any) => void;
}

export default function PaymentForm({ cardState, onCardInputChange }: Props) {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="nameOnCard"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Name on card" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: { component: CardNumberElement },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: { component: CardExpiryElement },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: { component: CardCvcElement },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
