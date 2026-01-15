import { type ReactNode } from 'react';
import { AdvancedSettingsSection } from '@/config/components/features/AdvancedSettingsSection';
import { FieldMappingSection } from '@/config/components/features/FieldMappingSection';

export type TabItem = {
  label: string;
  content: ReactNode;
};

export const FormTabs: TabItem[] = [
  {
    label: '基本設定',
    content: <FieldMappingSection />,
  },
  {
    label: '詳細設定',
    content: <AdvancedSettingsSection />,
  },
];
