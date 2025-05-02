import { type FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { PluginErrorBoundary } from '@/components/ErrorBoundary';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { tabs } from '@/config/model/tabs';

export const FormArea = styled.div`
  grid-area: content;
`;

export interface TabPanelProps {
  children?: ReactNode;
  index: number; // このパネルが担当するタブのインデックス
  value: number; // 現在アクティブなタブのインデックス
  [key: string]: any;
}

export const TabPanel: FC<TabPanelProps> = ({ children, index, value, ...other }) => {
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
      {tabs.map((tab, index) => (
        <TabPanel key={index} index={index} value={activeTabIndex}>
          <PluginErrorBoundary>{tab.content}</PluginErrorBoundary>
        </TabPanel>
      ))}
    </FormArea>
  );
};
