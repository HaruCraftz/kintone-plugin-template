import { type ReactNode } from 'react';
import { AdvancedSettings } from '@/config/components/features/AdvancedSettings';
import { SettingsForm } from '@/config/components/features/SettingsForm';

export type TabItem = {
  label: string;
  content: ReactNode;
};

export const FormTabs: TabItem[] = [
  {
    label: '基本設定',
    content: <SettingsForm />,
  },
  {
    label: '詳細設定',
    content: <AdvancedSettings />,
  },
];
