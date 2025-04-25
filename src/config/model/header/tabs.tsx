import { type ReactNode } from 'react';
import { PluginFormBasic } from '../form/basic';
import { PluginFormDetail } from '../form/detail';

export interface TabItem {
  label: string;
  content: ReactNode;
}

// タブの定義配列
export const pluginTabs: TabItem[] = [
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
