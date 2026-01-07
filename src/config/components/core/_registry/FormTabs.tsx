import { type ReactNode } from 'react';

// TODO: 機能が増えたらここに追加
import { CommonSettingsSection } from '@/config/components/features/common/CommonSettingsSection';
import { FieldMappingSection } from '@/config/components/features/general/FieldMappingSection';

export interface TabItem {
  label: string;
  content: ReactNode;
}

export const FormTabs: TabItem[] = [
  {
    label: '共通設定',
    content: <CommonSettingsSection />,
  },
  {
    label: '基本設定',
    content: <FieldMappingSection />,
  },
  // 必要に応じて他のタブを追加
  // {
  //   label: 'その他設定',
  //   content: <PluginFormOther />,
  // },
];
