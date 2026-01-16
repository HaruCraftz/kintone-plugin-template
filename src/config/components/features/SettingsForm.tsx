import type { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Stack, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { type PluginConfig, getNewCondition } from '@/shared/config';
import { useAppFields } from '@/shared/hooks/useAppFields';
import { FormSection, FormTitle, FormDescription } from '@/config/components/core/ui/form';
import { DynamicSortableList } from '@/config/components/core/ui/fields/DynamicSortableList';
import { FormAutocomplete } from '@/config/components/core/ui/fields/FormAutocomplete';
import { FormTextField } from '@/config/components/core/ui/fields/FormTextField';
import { useDuplicateCheck } from '@/config/hooks/useDuplicateCheck';

const SettingRow: FC<{ index: number }> = ({ index }) => {
  const { isDuplicate } = useDuplicateCheck(index, 'conditions');

  // アプリ内の全フィールドを選択候補にする
  const { fields } = useAppFields();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      spacing={2}
      sx={{ width: '100%' }}
    >
      <FormAutocomplete
        name={`conditions.${index}.fieldCode`}
        label='対象フィールド'
        placeholder='フィールドを選択してください'
        options={fields}
        shouldShowOption={(field) => !isDuplicate(field.code, 'fieldCode')}
        sx={{ flex: 1, minWidth: 0 }}
      />
      <ArrowForwardIosIcon sx={{ color: '#757575', display: { xs: 'none', sm: 'block' } }} />
      <FormTextField
        name={`conditions.${index}.message`}
        label='メッセージ'
        placeholder='任意のテキストを入力してください'
        sx={{ flex: 1, minWidth: 0 }}
      />
    </Stack>
  );
};

export const SettingsForm: FC = () => {
  const { control } = useFormContext<PluginConfig>();
  const { fields, append, remove, insert, move } = useFieldArray({ control, name: 'conditions' });

  return (
    <FormSection>
      <FormTitle>プラグイン設定</FormTitle>
      <FormDescription last>
        対象フィールドと、それに関連付けるメッセージを設定してください。
      </FormDescription>
      <Box sx={{ maxWidth: 840 }}>
        <DynamicSortableList
          items={fields}
          onMove={move}
          onRemove={remove}
          onAdd={(index) => {
            const row = getNewCondition();
            index !== undefined ? insert(index, row) : append(row);
          }}
          addButtonLabel='新しい設定を追加'
          renderItem={(_, index) => <SettingRow index={index} />}
        />
      </Box>
    </FormSection>
  );
};
