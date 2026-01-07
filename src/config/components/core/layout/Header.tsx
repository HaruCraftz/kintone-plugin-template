import { type FC } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { loadingAtom, activeTabIndexAtom } from '@/config/states/plugin';
import { useDiscardConfirm } from '@/config/hooks/useDiscardConfirm';
import { FormTabs } from '@/config/components/core/_registry/FormTabs';
import { SaveButton } from '@/config/components/core/ui/button/SaveButton';
import { CancelButton } from '@/config/components/core/ui/button/CancelButton';
import { DiscardConfirmDialog } from '@/config/components/core/ui/feedback/DiscardConfirmDialog';
import { MenuButton } from '@/config/components/core/ui/button/MenuButton';
import { useMenuItems } from '@/config/components/core/_registry/MenuItems';

export const Header: FC = () => {
  const loading = useAtomValue(loadingAtom);

  /** タブ関連 */
  const [value, setValue] = useAtom(activeTabIndexAtom);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getTabA11yProps = (index: number) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`, // IDで指定した要素を操作するものとスクリーンリーダーに伝えるための属性
    };
  };

  /** キャンセル関連 */
  const handleCancel = () => history.back();

  const { open, requestDiscard, confirmDiscard, closeDialog } = useDiscardConfirm(handleCancel);

  /** メニュー関連 */
  const menuItems = useMenuItems();

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
        value={value}
        onChange={handleChange}
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
        <DiscardConfirmDialog open={open} onClose={closeDialog} onConfirm={confirmDiscard} />
        <MenuButton loading={loading} items={menuItems} />
      </Stack>
    </Box>
  );
};
