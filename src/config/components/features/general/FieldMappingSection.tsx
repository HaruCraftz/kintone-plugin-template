import type { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Stack } from '@mui/material';
import type { PluginConfig } from '@/common/config';
import { DynamicSortableList } from '@/common/components/dnd/DynamicSortableList';
import { FormSection, FormTitle, FormDescription } from '@/config/components/core/ui/text';
import { FormFieldAutocomplete } from './FormFieldAutocomplete';

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
          const row = { id: nanoid(), srcFieldCode: '', destFieldCode: '' };
          index !== undefined ? insert(index, row) : append(row);
        }}
        addButtonLabel="新しい設定を追加"
        renderItem={(_, index) => (
          <Stack direction="row" spacing={2} alignItems="center">
            <FormFieldAutocomplete name={`conditions.${index}.srcFieldCode`} label="生年月日フィールド" />
            <FormFieldAutocomplete name={`conditions.${index}.destFieldCode`} label="年齢フィールド" />
          </Stack>
        )}
      />
    </FormSection>
  );
};
