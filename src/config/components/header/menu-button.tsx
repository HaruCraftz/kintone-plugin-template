import { type FC, type ReactNode, useState, type MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export interface MenuItemConfig {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface MenuButtonProps {
  items: MenuItemConfig[];
  disabled?: boolean;
}

export const MenuButton: FC<MenuButtonProps> = ({ items, disabled = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (onClick: () => void) => {
    onClick();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={disabled}
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
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(item.onClick)} disabled={item.disabled}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
