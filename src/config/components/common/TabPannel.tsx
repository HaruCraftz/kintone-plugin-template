import { type FC, type ReactNode } from 'react';
import Box from '@mui/material/Box';

// タブパネルのインターフェース
export interface TabPanelProps {
  children?: ReactNode;
  index: number; // このパネルが担当するタブのインデックス
  value: number; // 現在アクティブなタブのインデックス
  [key: string]: any;
}

// タブパネルコンポーネント
export const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`plugin-tabpanel-${index}`}
      aria-labelledby={`plugin-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
