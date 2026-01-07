import { type ReactNode } from 'react';

// TODO: 機能が増えたらここに追加
import { FieldMappingSection } from '@/config/components/features/general/FieldMappingSection';

export interface TabItem {
  label: string;
  content: ReactNode;
}

export const FormTabs: TabItem[] = [
  {
    label: '基本設定',
    content: <FieldMappingSection />,
  },
  // {
  //   label: '詳細設定',
  //   content: <PluginFormDetail />,
  // },
  // 必要に応じて他のタブを追加
  // {
  //   label: 'その他設定',
  //   content: <PluginFormOther />,
  // },
];
