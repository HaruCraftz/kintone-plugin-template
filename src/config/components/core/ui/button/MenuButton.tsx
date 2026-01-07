import { type FC, type MouseEvent, memo, useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { type MenuItemConfig } from '@/config/components/core/_registry/MenuItems';

type Props = {
  items: MenuItemConfig[];
  loading?: boolean;
  buttonId?: string;
};

const DEFAULT_BUTTON_ID = 'generic-menu-button';

export const MenuButton: FC<Props> = memo(function MenuButton({ items, loading, buttonId = DEFAULT_BUTTON_ID }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={buttonId}
        size="small"
        onClick={handleOpen}
        aria-controls={open ? 'menu-list' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="menu-list"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { 'aria-labelledby': buttonId },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.id}
            disabled={loading}
            onClick={() => {
              item.onSelect();
              handleClose();
            }}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});
