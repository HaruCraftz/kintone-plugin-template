import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useAppFields } from '@/shared/hooks/useAppFields';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  typeFilter?: string[];
};

export const FormAutocomplete: FC<Props> = ({ name, label, placeholder, typeFilter }) => {
  const { control } = useFormContext();
  const { options } = useAppFields(typeFilter);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={options.find((opt) => opt.code === value) ?? null}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(opt, v) => opt.code === v.code}
          onChange={(_, newValue) => onChange(newValue?.code ?? '')}
          fullWidth
          size="small"
          renderOption={(props, option) => {
            const { key, ...rest } = props;
            return (
              <Box
                key={key}
                component="li"
                {...rest}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
                  コード: {option.code}
                </Typography>
                <Typography variant="body2">{option.label}</Typography>
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              variant="outlined"
              color="primary"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
};
