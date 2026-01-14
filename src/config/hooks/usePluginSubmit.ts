import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import { storeConfig, type PluginConfig } from '@/shared/config';
import { loadingAtom } from '@/config/states/plugin';
import { useSyncPluginConfig } from './useSyncPluginConfig';

type UsePluginSubmitProps = {
  onSuccess?: () => void;
  onError?: () => void;
  successAction?: React.ReactNode; // 保存成功時のSnackbarに表示するアクション
};

export const usePluginSubmit = ({ onSuccess, onError, successAction }: UsePluginSubmitProps) => {
  const setLoading = useSetAtom(loadingAtom);
  const { syncConfig } = useSyncPluginConfig();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    async (data: PluginConfig) => {
      try {
        setLoading(true);

        // kintoneへ保存
        storeConfig(data, () => {});

        // 状態の同期更新 (Jotai & RHF)
        syncConfig(data);

        enqueueSnackbar('設定を保存しました。', {
          variant: 'success',
          action: successAction,
        });

        onSuccess?.();
      } catch (e) {
        console.error(e);
        enqueueSnackbar('保存に失敗しました。', { variant: 'error' });
        onError?.();
      } finally {
        setLoading(false);
      }
    },
    [syncConfig, setLoading, enqueueSnackbar, onSuccess, onError, successAction]
  );

  return { onSubmit };
};
