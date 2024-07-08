import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface AppTextInputProps extends Omit<TextFieldProps, "name"> {
  name: string;
}

export default function AppTextInput({ name, ...props }: AppTextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          value={field.value || ""}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
}
