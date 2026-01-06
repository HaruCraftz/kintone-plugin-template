import { useState } from 'react';
import { useFormState } from 'react-hook-form';

/** 変更破棄確認ダイアログのカスタムフック */
export const useDiscardConfirm = (onDiscard: () => void) => {
  const { isDirty } = useFormState();
  const [open, setOpen] = useState(false);

  const requestDiscard = () => {
    if (isDirty) {
      setOpen(true);
    } else {
      onDiscard();
    }
  };

  const confirmDiscard = () => {
    setOpen(false);
    onDiscard();
  };

  const closeDialog = () => setOpen(false);

  return {
    open,
    requestDiscard,
    confirmDiscard,
    closeDialog,
  };
};
