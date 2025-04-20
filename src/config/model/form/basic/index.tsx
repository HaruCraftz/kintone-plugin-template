import { FC } from 'react';
import { JotaiSwitch } from '@/components/jotai';
import { getConditionPropertyAtom } from '@/config/states/plugin';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@/config/components/form';
import FieldsForm from './fields';

export const PluginForm: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>フィールドの設定</PluginFormTitle>
        <PluginFormDescription last>
          生年月日フィールドと年齢を表示するフィールドを選択してください。
        </PluginFormDescription>
        <FieldsForm />
        <JotaiSwitch
          atom={getConditionPropertyAtom('isUpdateOnSave')}
          label='レコードを保存する度に年齢を更新する'
        />
      </PluginFormSection>
    </div>
  );
};
