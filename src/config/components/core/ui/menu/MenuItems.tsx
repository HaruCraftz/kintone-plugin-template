import { type ReactNode } from 'react';
import { RestartAlt } from '@mui/icons-material';
import { useResetConfig } from '@/config/hooks/useResetConfig';

export type MenuItemConfig = {
  id: string;
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
};

export const useMenuItems = (): MenuItemConfig[] => [
  {
    id: 'reset-settings',
    label: '設定をリセット',
    icon: <RestartAlt fontSize="small" />,
    onSelect: useResetConfig(),
  },
];
