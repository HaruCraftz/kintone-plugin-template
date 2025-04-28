import { FC } from 'react';
import { JotaiSwitch } from '@/components/jotai';
import { getConditionPropertyAtom } from '@/config/states/plugin';
import { PluginFormSection, PluginFormTitle, PluginFormDescription } from '@/config/components/form';

export const PluginFormDetail: FC = () => {
  return (
    <>
      <PluginFormSection>
        <PluginFormTitle>レコード保存時の設定</PluginFormTitle>
        <PluginFormDescription last>レコード保存時に年齢計算を実行するか選択してください。</PluginFormDescription>
        <JotaiSwitch atom={getConditionPropertyAtom('isUpdateOnSave')} label='レコードを保存する度に年齢を更新する' />
      </PluginFormSection>
    </>
  );
};
