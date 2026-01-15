import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import { storeConfig, type PluginConfig } from '@/shared/config';
import { loadingAtom } from '@/config/states/plugin';
import { PluginLogger } from '@/shared/lib/logger';
import { useSyncPluginConfig } from './useSyncPluginConfig';

const logger = new PluginLogger('Config');

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

        logger.group('kintone Plugin Config Save');
        logger.log('Saving Data:', data);

        // kintoneへ保存
        storeConfig(data, () => {
          logger.log('kintone.plugin.app.setConfig: Success');
        });

        // 状態の同期更新 (Jotai & RHF)
        syncConfig(data);

        enqueueSnackbar('設定を保存しました。', {
          variant: 'success',
          action: successAction,
        });

        logger.info('Save Process Completed Successfully');
        onSuccess?.();
      } catch (e) {
        logger.error('Save Process Failed:', e);
        enqueueSnackbar('保存に失敗しました。', { variant: 'error' });
        onError?.();
      } finally {
        logger.groupEnd();
        setLoading(false);
      }
    },
    [syncConfig, setLoading, enqueueSnackbar, onSuccess, onError, successAction]
  );

  return { onSubmit };
};
