import { type FC } from 'react';
import { useAtomValue } from 'jotai';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { loadingAtom } from '@/config/states/plugin';
import { useDiscardConfirm } from '@/config/hooks/useDiscardConfirm';
import { FormTabs } from '@/config/components/features/FormTabs';
import { SaveButton } from '@/config/components/core/ui/button/SaveButton';
import { CancelButton } from '@/config/components/core/ui/button/CancelButton';
import { DiscardConfirmDialog } from '@/config/components/core/ui/feedback/DiscardConfirmDialog';
import { MenuButton } from '@/config/components/core/ui/button/MenuButton';
import { useMenuItems } from '@/config/components/core/ui/menu/MenuItems';

type Props = {
  activeTab: number;
  onTabChange: (index: number) => void;
  onCancel: () => void;
};

export const Header: FC<Props> = ({ activeTab, onTabChange, onCancel }) => {
  const loading = useAtomValue(loadingAtom);
  const menuItems = useMenuItems();

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

  /** キャンセル */
  const { open, requestDiscard, confirmDiscard, closeDialog } = useDiscardConfirm(onCancel);

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
        {FormTabs.map((tab, index) => (
          <Tab label={tab.label} key={index} {...getTabA11yProps(index)} />
        ))}
      </Tabs>

      {/* 右側コンテンツ：アクションボタン群 */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <SaveButton loading={loading} />
        <CancelButton loading={loading} onClick={requestDiscard} />
        <DiscardConfirmDialog open={open} onConfirm={confirmDiscard} onClose={closeDialog} />
        <MenuButton loading={loading} items={menuItems} />
      </Stack>
    </Box>
  );
};
