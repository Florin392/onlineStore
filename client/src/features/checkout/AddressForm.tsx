import { useEffect, useCallback } from "react";
import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";
import AppTextInput from "../../app/components/AppTextInput";
import { selectAddress } from "../../state/checkout/selectors";
import { useAppSelector } from "../../app/hooks/useAppSelector";

export default function AddressForm() {
  const { reset } = useFormContext();
  const address = useAppSelector(selectAddress);

  const initializeForm = useCallback(() => {
    if (address) {
      reset(address);
    }
  }, [address, reset]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="fullName" label="Full Name" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput name="address1" label="Address Line 1" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput name="address2" label="Address Line 2" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="state" label="State" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="zip" label="ZIP / Postal code" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="country" label="Country" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox name="saveAddress" label="Save this address" />
        </Grid>
      </Grid>
    </>
  );
}
