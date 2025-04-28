import { type FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { PluginErrorBoundary } from '@/components/ErrorBoundary';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { pluginTabs } from '@/config/model/header/tabs';

export const FormArea = styled.div`
  grid-area: content;
`;

export interface TabPanelProps {
  children?: ReactNode;
  index: number; // このパネルが担当するタブのインデックス
  value: number; // 現在アクティブなタブのインデックス
  [key: string]: any;
}

export const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`plugin-tabpanel-${index}`}
      aria-labelledby={`plugin-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export const PluginForm: FC = () => {
  const activeTabIndex = useAtomValue(activeTabIndexAtom);

  return (
    <FormArea>
      {pluginTabs.map((tab, index) => (
        <TabPanel key={index} value={activeTabIndex} index={index}>
          <PluginErrorBoundary>{tab.content}</PluginErrorBoundary>
        </TabPanel>
      ))}
    </FormArea>
  );
};
