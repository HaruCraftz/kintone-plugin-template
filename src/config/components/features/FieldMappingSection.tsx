import type { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Stack } from '@mui/material';
import { type PluginConfig, getNewCondition } from '@/shared/config';
import { FormSection, FormTitle, FormDescription } from '@/config/components/core/ui/form';
import { DynamicSortableList } from '@/config/components/core/ui/fields/DynamicSortableList';
import { FormAutocomplete } from '@/config/components/core/ui/fields/FormAutocomplete';
import { useDuplicateCheck } from '@/config/hooks/useDuplicateCheck';

const FieldMappingRow: FC<{ index: number }> = ({ index }) => {
  const { isDuplicate } = useDuplicateCheck(index, 'conditions');

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormAutocomplete
        name={`conditions.${index}.srcFieldCode`}
        label="生年月日フィールド"
        placeholder="フィールドを選択してください"
        typeFilter={['DATE']}
        shouldShowOption={(field) => !isDuplicate(field.code, 'srcFieldCode')}
      />
      <FormAutocomplete
        name={`conditions.${index}.destFieldCode`}
        label="年齢フィールド"
        placeholder="フィールドを選択してください"
        typeFilter={['SINGLE_LINE_TEXT']}
        shouldShowOption={(field) => !isDuplicate(field.code, 'destFieldCode')}
      />
    </Stack>
  );
};

export const FieldMappingSection: FC = () => {
  const { control } = useFormContext<PluginConfig>();
  const { fields, append, remove, insert, move } = useFieldArray({ control, name: 'conditions' });

  return (
    <FormSection>
      <FormTitle>フィールドの設定</FormTitle>
      <FormDescription last>生年月日フィールドと年齢を表示するフィールドを選択してください。</FormDescription>
      <DynamicSortableList
        items={fields}
        onMove={move}
        onRemove={remove}
        onAdd={(index) => {
          const row = getNewCondition();
          index !== undefined ? insert(index, row) : append(row);
        }}
        addButtonLabel="新しい設定を追加"
        renderItem={(_, index) => <FieldMappingRow index={index} />}
      />
    </FormSection>
  );
};
