import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useAppFields } from '@/shared/hooks/useAppFields';
import type { FieldType } from '@/types/kintone';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  typeFilter?: FieldType[];
  shouldShowOption?: (field: { label: string; code: string }) => boolean;
  sx?: SxProps<Theme>;
};

export const FormAutocomplete: FC<Props> = ({
  name,
  label,
  placeholder,
  typeFilter,
  shouldShowOption,
  sx,
}) => {
  const { control } = useFormContext();
  const { fields: fieldOptions } = useAppFields(typeFilter);
  // fieldOptionsをフィルタリング
  const filteredOptions = shouldShowOption ? fieldOptions.filter(shouldShowOption) : fieldOptions;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={filteredOptions}
          value={filteredOptions.find((opt) => opt.code === value) ?? null}
          getOptionLabel={(opt) => opt.label}
          isOptionEqualToValue={(opt, v) => opt.code === v.code}
          onChange={(_, field) => onChange(field?.code ?? '')}
          fullWidth
          sx={{
            width: { xs: '100%', sm: 400 },
            ...sx,
          }}
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
