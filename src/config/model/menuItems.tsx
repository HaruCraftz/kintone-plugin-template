import { type MenuItemConfig } from '@/config/components/ui/header/MenuButton';
import { ResetMenuItem } from '@/config/components/ui/menu/ResetMenuItem';

export const menuItems: MenuItemConfig[] = [
  {
    id: 'reset-settings',
    renderContent: (closeMenu) => <ResetMenuItem closeMenu={closeMenu} />,
  },
  // 将来的に追加するメニューアイテムはここに追加
];
