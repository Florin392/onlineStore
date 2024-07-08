import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { Product } from "../../app/models/products";
import { useCallback, useEffect } from "react";
import useProducts from "../../app/hooks/useProducts";
import AppSelectList from "../../app/components/AppSelectList";
import AppDropzone from "../../app/components/AppDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { setProduct } from "../../state/catalog/slice";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

export default function ProductForm({ cancelEdit, product }: Props) {
  const methods = useForm({
    resolver: yupResolver<any>(productValidationSchema),
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = methods;

  const { brands, types } = useProducts();
  const watchFile = watch("file", null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  const handleSubmitData = useCallback(
    async (data: FieldValues) => {
      try {
        let response: Product;
        if (product) {
          response = await agent.Admin.updateProduct(data);
        } else {
          response = await agent.Admin.createProduct(data);
        }
        dispatch(setProduct(response));
        cancelEdit();
      } catch (error) {
        console.log(error);
      }
    },
    [product, dispatch, cancelEdit]
  );

  return (
    <FormProvider {...methods}>
      <Box component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Product Details
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <AppTextInput name="name" label="Product name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectList items={brands} name="brand" label="Brand" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectList items={types} name="type" label="Type" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput name="price" label="Price" type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                name="quantityInStock"
                label="Quantity in Stock"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextInput
                name="description"
                label="Description"
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <AppDropzone name="file" />
                {watchFile ? (
                  <img
                    src={watchFile.preview}
                    alt="preview"
                    style={{ maxHeight: 200 }}
                  />
                ) : (
                  <img
                    src={product?.pictureUrl}
                    alt={product?.name}
                    style={{ maxHeight: 200 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button variant="contained" color="inherit" onClick={cancelEdit}>
              Cancel
            </Button>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
}
