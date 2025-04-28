import { type FC, type ReactNode, useState, type MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export interface MenuItemConfig {
  id?: string | number;
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  renderContent?: (closeMenu: () => void) => ReactNode;
  disabled?: boolean;
}

interface MenuButtonProps {
  items: MenuItemConfig[];
  disabled?: boolean;
  buttonId?: string;
}

const DEFAULT_BUTTON_ID = 'generic-menu-button';

export const MenuButton: FC<MenuButtonProps> = ({ items, buttonId = DEFAULT_BUTTON_ID }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (itemOnClick: (() => void) | undefined) => {
    if (itemOnClick) {
      itemOnClick(); // 提供された onClick を実行
    }
    handleClose(); // メニューを閉じる
  };

  return (
    <>
      <IconButton
        id={buttonId}
        onClick={handleClick}
        size='small'
        aria-controls={open ? 'menu-list' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id='menu-list'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        {items.map((item, index) => {
          if (item.renderContent) {
            return (
              <MenuItem key={item.id ?? index} disabled={item.disabled}>
                {item.renderContent(handleClose)}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                key={item.id ?? index}
                onClick={() => handleMenuItemClick(item.onClick)}
                disabled={item.disabled}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                {item.label && <ListItemText>{item.label}</ListItemText>}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
};
