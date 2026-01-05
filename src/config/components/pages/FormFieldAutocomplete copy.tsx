import { type FC, Suspense } from 'react';
import { type Control, Controller } from 'react-hook-form';
import { Autocomplete, Box, TextField, Typography, Skeleton } from '@mui/material';
import { useAppFields } from '@/common/hooks/useAppFields';

interface FormFieldAutocompleteProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  typeFilter?: string[]; // 特定のフィールド型のみ抽出したい場合（例：['SINGLE_LINE_TEXT']）
  disabled?: boolean;
}

/**
 * Jotaiからデータを取得して表示する実体コンポーネント
 */
const AutocompleteControl: FC<FormFieldAutocompleteProps> = ({
  name,
  control,
  label,
  placeholder,
  typeFilter,
  disabled,
}) => {
  const fields = useAppFields(typeFilter);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // 現在の「コード」に合致するフィールドオブジェクトを特定
        const selectedOption = fields.find((f) => f.code === value) ?? null;

        return (
          <Autocomplete
            options={fields}
            value={selectedOption}
            disabled={disabled}
            fullWidth
            getOptionLabel={(option) => `${option.label} (${option.code})`}
            isOptionEqualToValue={(option, v) => option.code === v.code}
            onChange={(_, newValue) => onChange(newValue?.code ?? '')}
            // 選択肢の表示をカスタマイズ（提示いただいたスタイルを再現）
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  {...optionProps}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 0.5 }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px' }}>
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
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />
        );
      }}
    />
  );
};

/**
 * Loading中のスケルトン表示
 */
const AutocompletePlaceholder: FC<{ label: string }> = ({ label }) => (
  <Box sx={{ width: '100%' }}>
    <Skeleton variant="text" width={60} height={20} sx={{ mb: 0.5 }} />
    <Skeleton variant="outlined" width="100%" height={40} />
  </Box>
);

/**
 * Suspenseでラップしたエクスポート用コンポーネント
 */
export const FormFieldAutocomplete: FC<FormFieldAutocompleteProps> = (props) => {
  return (
    <Box sx={{ minWidth: 250, flex: 1 }}>
      <Suspense fallback={<AutocompletePlaceholder label={props.label} />}>
        <AutocompleteControl {...props} />
      </Suspense>
    </Box>
  );
};
