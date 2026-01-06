import type { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { nanoid } from 'nanoid';
import type { PluginConfig } from '@/common/config';
import { DynamicSortableList } from '@/common/components/dnd/DynamicSortableList';
import { FormFieldAutocomplete } from './FormFieldAutocomplete';

export const FieldMappingSection: FC = () => {
  const { control } = useFormContext<PluginConfig>();
  const { fields, append, remove, insert, move } = useFieldArray({ control, name: 'conditions' });

  return (
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
        <>
          <FormFieldAutocomplete name={`conditions.${index}.srcFieldCode`} label="コピー元" />
          <FormFieldAutocomplete name={`conditions.${index}.destFieldCode`} label="コピー先" />
        </>
      )}
    />
  );
};
