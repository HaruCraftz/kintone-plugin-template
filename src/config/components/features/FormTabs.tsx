import { type ReactNode } from 'react';
import { CommonSettingsSection } from '@/config/components/features/CommonSettingsSection';
import { FieldMappingSection } from '@/config/components/features/FieldMappingSection';

export interface TabItem {
  label: string;
  content: ReactNode;
}

export const FormTabs: TabItem[] = [
  {
    label: '基本設定',
    content: <FieldMappingSection />,
  },
  {
    label: '共通設定',
    content: <CommonSettingsSection />,
  },
];
