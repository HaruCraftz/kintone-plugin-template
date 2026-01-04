import { type FC, useCallback, memo } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { storeConfig } from '@/common/config';

type Props = {
  loading: boolean;
};

export const Component: FC<Props> = ({ loading }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = useAtomCallback(
    useCallback(
      async (get, set) => {
        try {
          set(loadingAtom, true);
          const pluginConfig = get(pluginConfigAtom);
          storePluginConfig(pluginConfig, {
            callback: () => {},
            debug: true,
          });
          enqueueSnackbar('設定を保存しました', {
            variant: 'success',
            action: (
              <Button color="inherit" size="small" variant="outlined" onClick={onBackButtonClick}>
                プラグイン一覧に戻る
              </Button>
            ),
          });
        } finally {
          set(loadingAtom, false);
        }
      },
      [enqueueSnackbar, onBackButtonClick]
    )
  );

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={loading}
      onClick={onSaveButtonClick}
      startIcon={loading ? <CircularProgress color="inherit" size={20} /> : <SaveIcon />}
    >
      設定を保存
    </Button>
  );
};

export default memo(Component);
