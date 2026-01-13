import { type FC, type MouseEvent, type ReactNode, memo, useState } from 'react';
import { IconButton, Menu } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

type Props = {
  loading?: boolean;
  children?: ReactNode;
  buttonId?: string;
};

const DEFAULT_BUTTON_ID = 'generic-menu-button';

export const MenuButton: FC<Props> = memo(function MenuButton({
  loading,
  children,
  buttonId = DEFAULT_BUTTON_ID,
}) {
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
        disabled={loading}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="menu-list"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        keepMounted
        slotProps={{
          list: { 'aria-labelledby': buttonId },
        }}
      >
        {children}
      </Menu>
    </>
  );
});
