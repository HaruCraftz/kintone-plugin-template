import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import type { SwitchProps } from '@mui/material';

type Props = {
  name: string;
  label?: string;
} & Omit<SwitchProps, 'checked'>;

/**
 * React Hook Form と連動するスイッチコンポーネントです。
 */
export const FormSwitch: FC<Props> = ({ name, label, ...switchProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControlLabel
          control={
            <Switch {...switchProps} checked={!!value} onChange={(e) => onChange(e.target.checked)} size="small" />
          }
          label={label}
        />
      )}
    />
  );
};
