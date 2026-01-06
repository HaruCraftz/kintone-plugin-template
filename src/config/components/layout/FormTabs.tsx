import { type ReactNode } from 'react';
import { PluginFormBasic } from '../components/layout/form/basic';
import { PluginFormDetail } from '../components/layout/form/detail';

export interface TabItem {
  label: string;
  content: ReactNode;
}

export const FormTabs: TabItem[] = [
  {
    label: '基本設定',
    content: <PluginFormBasic />,
  },
  {
    label: '詳細設定',
    content: <PluginFormDetail />,
  },
  // 必要に応じて他のタブを追加
  // {
  //   label: 'その他設定',
  //   content: <PluginFormOther />,
  // },
];
