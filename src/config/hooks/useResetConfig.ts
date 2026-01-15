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
    // keepDefaultValues: true を指定することで、保存済み設定との差分を検知し isDirty を true に維持して保存可能にする
    syncConfig(defaultConfig, { keepDefaultValues: true });

    enqueueSnackbar('設定をリセットしました', { variant: 'success' });
  }, [enqueueSnackbar, syncConfig]);
};
