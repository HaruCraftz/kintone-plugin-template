import { FC } from 'react';
import { PluginFormSection, PluginFormTitle, PluginFormDescription } from '@/config/components/form';
import FieldsForm from './FieldMappingEditorContainer';

export const PluginFormBasic: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>フィールドの設定</PluginFormTitle>
        <PluginFormDescription last>
          生年月日フィールドと年齢を表示するフィールドを選択してください。
        </PluginFormDescription>
        <FieldsForm />
      </PluginFormSection>
    </div>
  );
};
