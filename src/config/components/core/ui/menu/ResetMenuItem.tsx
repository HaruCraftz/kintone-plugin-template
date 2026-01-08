import { type FC, useState } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';
import { useResetConfig } from '@/config/hooks/useResetConfig';
import { ResetConfirmDialog } from '@/config/components/core/ui/feedback/ResetConfirmDialog';

export const ResetMenuItem: FC = () => {
  const [open, setOpen] = useState(false);
  const resetConfig = useResetConfig();

  const handleConfirm = () => {
    resetConfig();
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>
        <ListItemIcon>
          <RestartAlt fontSize="small" />
        </ListItemIcon>
        <ListItemText>設定をリセット</ListItemText>
      </MenuItem>
      <ResetConfirmDialog open={open} onConfirm={handleConfirm} onClose={() => setOpen(false)} />
    </>
  );
};
