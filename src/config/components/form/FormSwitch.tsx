import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Switch, Typography, Box } from '@mui/material';

type Props = {
  name: string;
  label: string;
  description?: string;
};

export const FormSwitch: FC<Props> = ({ name, label, description }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box>
          <FormControlLabel label={label} control={<Switch {...field} checked={field.value} />} />
          {description && (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
              {description}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};
