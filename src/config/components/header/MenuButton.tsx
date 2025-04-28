import { type FC } from 'react';
import { MenuButton, type MenuItemConfig } from '@/components/MenuButton';
import { ResetMenuItem } from './menu/ResetMenuItem';

interface MenuProps {
  loading?: boolean;
}

const Component: FC<MenuProps> = ({ loading = false }) => {
  const menuItems: MenuItemConfig[] = [
    {
      id: 'reset-settings',
      renderContent: (closeMenu) => <ResetMenuItem closeMenu={closeMenu} />,
      disabled: loading,
    },
    // 将来的に追加するメニューアイテムはここに追加
  ];

  return <MenuButton items={menuItems} />;
};

export default Component;
