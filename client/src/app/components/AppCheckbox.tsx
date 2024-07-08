import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface AppCheckboxProps {
  name: string;
  label: string;
}

export default function AppCheckbox({ name, label }: AppCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={!!field.value} />}
          label={label}
        />
      )}
    />
  );
}