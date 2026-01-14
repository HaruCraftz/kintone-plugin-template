import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { createConfig } from '@/shared/config';
import { useSyncPluginConfig } from './useSyncPluginConfig';

/** プラグイン設定情報をリセットするカスタムフック */
export const useResetConfig = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { syncConfig } = useSyncPluginConfig();

  return useCallback(() => {
    const defaultConfig = createConfig();

    // 状態の同期更新 (Jotai & RHF)
    syncConfig(defaultConfig);

    enqueueSnackbar('設定をリセットしました', { variant: 'success' });
  }, [enqueueSnackbar, syncConfig]);
};
