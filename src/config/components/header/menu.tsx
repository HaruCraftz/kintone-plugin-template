import type { FC } from 'react';
import { RestartAlt } from '@mui/icons-material';
import { MenuButton, type MenuItemConfig } from './menu-button';

interface MenuProps {
  loading?: boolean;
}

const Menu: FC<MenuProps> = ({ loading = false }) => {
  const menuItems: MenuItemConfig[] = [
    {
      label: '設定をリセット',
      icon: <RestartAlt fontSize='small' />,
      onClick: () => {
        console.log('設定をリセットしました');
      },
      disabled: loading,
    },
    // 将来的に追加するメニューアイテムはここに追加
  ];

  return <MenuButton items={menuItems} disabled={loading} />;
};

export default Menu;
