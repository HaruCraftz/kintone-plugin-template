import type { FC } from 'react';
import { FormSection, FormTitle, FormDescription } from '@/config/components/core/ui/form';
import { FormSwitch } from '@/config/components/core/ui/fields/FormSwitch';

export const CommonSettingsSection: FC = () => {
  return (
    <FormSection>
      <FormTitle>レコード保存時の設定</FormTitle>
      <FormDescription last>レコード保存時に年齢計算を実行するか選択してください。</FormDescription>
      <FormSwitch name="common.isUpdateOnSave" label="レコードを保存する度に年齢を更新する" />
    </FormSection>
  );
};
