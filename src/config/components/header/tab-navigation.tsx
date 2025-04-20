import type React from 'react';
import { type FC, type ReactNode, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { PluginErrorBoundary } from '@/components/error-boundary';

// タブパネルのインターフェース
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

// タブパネルコンポーネント
const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`plugin-tabpanel-${index}`}
      aria-labelledby={`plugin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

// タブのアクセシビリティプロパティを取得する関数
const a11yProps = (index: number) => {
  return {
    id: `plugin-tab-${index}`,
    'aria-controls': `plugin-tabpanel-${index}`,
  };
};

export interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  defaultTab?: number;
}

export const TabNavigation: FC<TabNavigationProps> = ({ tabs, defaultTab = 0 }) => {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          aria-label='プラグイン設定タブ'
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <PluginErrorBoundary>{tab.content}</PluginErrorBoundary>
        </TabPanel>
      ))}
    </Box>
  );
};
