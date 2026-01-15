import { type FC } from 'react';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { type TabItem } from '@/config/components/features/FormTabs';
import { SaveButton } from '@/config/components/core/ui/button/SaveButton';
import { CancelButton } from '@/config/components/core/ui/button/CancelButton';
import { MenuButton } from '@/config/components/core/ui/button/MenuButton';
import { ResetMenuItem } from '@/config/components/core/ui/menu/ResetMenuItem';

type Props = {
  tabs: TabItem[];
  activeTab: number;
  onTabChange: (index: number) => void;
  onCancel: () => void;
};

export const Header: FC<Props> = ({ tabs, activeTab, onTabChange, onCancel }) => {
  /** タブ */
  const handleTabChange = (_: React.SyntheticEvent, index: number) => {
    onTabChange(index);
  };

  const getTabA11yProps = (index: number) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`, // IDで指定した要素を操作するものとスクリーンリーダーに伝えるための属性
    };
  };

  return (
    <Box
      component="header"
      sx={{
        // レイアウト設定
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        // 配置・固定設定
        position: 'sticky',
        top: 48, // kintoneヘッダーの高さを考慮
        zIndex: 30,

        // スペーシング設定
        px: 2, // 水平方向のパディング

        // スタイル設定
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      {/* 左側コンテンツ：タブ */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable-auto-tabs"
      >
        {tabs.map((tab, index) => (
          <Tab label={tab.label} key={index} {...getTabA11yProps(index)} />
        ))}
      </Tabs>

      {/* 右側コンテンツ：アクションボタン群 */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <SaveButton />
        <CancelButton onClick={onCancel} />
        <MenuButton>
          <ResetMenuItem />
        </MenuButton>
      </Stack>
    </Box>
  );
};
