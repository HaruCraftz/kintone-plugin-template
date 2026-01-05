import { type MenuItemConfig } from '../button/MenuButton';
import { ResetMenuItem } from './ResetMenuItem';

export const menuItems: MenuItemConfig[] = [
  {
    id: 'reset-settings',
    renderContent: (closeMenu) => <ResetMenuItem closeMenu={closeMenu} />,
  },
  // 将来的に追加するメニューアイテムはここに追加
];
