import { type FC, memo } from 'react';
import { useAtomValue } from 'jotai';
import { useFormState } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { loadingAtom } from '@/config/states/plugin';

export const SaveButton: FC = memo(function SaveButton() {
  const loading = useAtomValue(loadingAtom);
  const { isDirty, isSubmitting } = useFormState();

  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      startIcon={loading ? <CircularProgress color='inherit' size={18} /> : <SaveIcon />}
      disabled={loading || !isDirty || isSubmitting}
    >
      設定を保存
    </Button>
  );
});
