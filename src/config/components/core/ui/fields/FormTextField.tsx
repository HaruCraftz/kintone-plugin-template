import type { ComponentProps, FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type Props = ComponentProps<typeof TextField> & {
  name: string;
};

export const FormTextField: FC<Props> = ({ name, helperText, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message || helperText}
        />
      )}
    />
  );
};
