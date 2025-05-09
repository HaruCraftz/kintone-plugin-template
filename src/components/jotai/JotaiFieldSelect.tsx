import { ComponentProps, FC, Suspense, useCallback } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { Atom, useAtomValue } from 'jotai';
import { kintoneAPI } from '@/types/kintone/api';

type ContainerProps = {
  fieldPropertiesAtom: Atom<Promise<kintoneAPI.FieldProperty[]>>;
  fieldCode: string;
  onChange: (code: string) => void;
  label?: string;
  placeholder?: string;
  fieldCodeLabelPrefix?: string;
} & Omit<ComponentProps<typeof Autocomplete>, 'onChange' | 'value' | 'renderInput' | 'options'>;

type Props = Omit<ContainerProps, 'fieldPropertiesAtom' | 'onChange' | 'fieldCode'> & {
  value: kintoneAPI.FieldProperty | null;
  fieldProperties: kintoneAPI.FieldProperty[];
  onFieldChange: (_: unknown, field: kintoneAPI.FieldProperty | null) => void;
};

const JotaiFieldAutocomplete: FC<Props> = ({
  fieldProperties,
  value,
  onFieldChange,
  label,
  placeholder,
  fieldCodeLabelPrefix = 'コード: ',
  ...autocompleteProps
}) => (
  <Autocomplete
    value={value}
    options={fieldProperties}
    isOptionEqualToValue={(option, v) => option.code === v.code}
    getOptionLabel={(option) => `${option.label}(${option.code})`}
    onChange={onFieldChange}
    sx={autocompleteProps.sx}
    fullWidth={autocompleteProps.fullWidth}
    renderOption={(props, option) => {
      const { key, ...optionProps } = props;
      return (
        <Box
          key={key}
          component='li'
          sx={{
            '& > div': { display: 'grid' },
            '& > div > div:first-of-type': { fontSize: '12px', color: '#6b7280' },
          }}
          {...optionProps}
        >
          <div>
            <div>
              {fieldCodeLabelPrefix}
              {option.code}
            </div>
            {option.label}
          </div>
        </Box>
      );
    }}
    renderInput={(params) => (
      <TextField {...params} label={label} placeholder={placeholder} variant='outlined' color='primary' />
    )}
    disabled={autocompleteProps.disabled}
  />
);

const JotaiFieldSelectComponent: FC<ContainerProps> = ({ fieldPropertiesAtom, onChange, fieldCode, ...rest }) => {
  // フィールド情報を取得
  const fieldProperties = useAtomValue(fieldPropertiesAtom);
  // 指定されたフィールドの情報を取得
  const value = fieldProperties.find((field) => field.code === fieldCode) ?? null;

  const onFieldChange = useCallback(
    (_: unknown, field: kintoneAPI.FieldProperty | null) => onChange(field?.code ?? ''),
    [onChange]
  );

  return <JotaiFieldAutocomplete {...{ onFieldChange, value, fieldProperties, ...rest }} />;
};

const JotaiFieldSelectPlaceHolder: FC<ContainerProps> = ({ label, placeholder, ...autocompleteProps }) => (
  <TextField label={label} placeholder={placeholder} value='' sx={autocompleteProps.sx} disabled />
);

export const JotaiFieldSelect: FC<ContainerProps> = (props) => {
  const completed: ContainerProps = {
    placeholder: 'フィールドを選択してください',
    sx: { width: 350, ...props.sx },
    ...props,
  };

  return (
    <Suspense fallback={<JotaiFieldSelectPlaceHolder {...completed} />}>
      <JotaiFieldSelectComponent {...completed} />
    </Suspense>
  );
};
