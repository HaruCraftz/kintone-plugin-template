import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useAppFields } from '@/common/hooks/useAppFields';

type Props = {
  name: string;
  label: string;
  typeFilter?: string[];
};

export const FormFieldAutocomplete: FC<Props> = ({ name, label, typeFilter }) => {
  const { control } = useFormContext();
  const { options } = useAppFields(typeFilter);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={options.find((opt) => opt.value === value) ?? null}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(opt, v) => opt.value === v.value}
          onChange={(_, newValue) => onChange(newValue?.value ?? '')}
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
                  コード: {option.value}
                </Typography>
                <Typography variant="body2">{option.label}</Typography>
              </Box>
            );
          }}
          renderInput={(params) => <TextField {...params} label={label} error={!!error} helperText={error?.message} />}
        />
      )}
    />
  );
};
