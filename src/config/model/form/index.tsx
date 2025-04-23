// src/model/form/index.tsx (修正 - コンテンツ表示部分)
import { type FC } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { PluginErrorBoundary } from '@/components/ErrorBoundary';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { pluginTabs } from '@/config/model/tabs';
import { TabPanel } from '@/config/components/common/TabPannel';

// フォームエリア用のスタイル
export const FormArea = styled.div`
  grid-area: content;
`;

// PluginForm コンポーネント
export const PluginForm: FC = () => {
  // Jotaiのアトムから現在アクティブなタブのインデックスを取得
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
