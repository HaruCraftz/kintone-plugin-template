import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import type { UseFormReset } from 'react-hook-form';
import { storeConfig, type PluginConfig } from '@/shared/config';
import { pluginConfigAtom } from '@/config/states/plugin';

type UsePluginSubmitProps = {
  reset: UseFormReset<PluginConfig>;
  onSuccess?: () => void;
  onError?: () => void;
  successAction?: React.ReactNode; // 保存成功時のSnackbarに表示するアクション
};

export const usePluginSubmit = ({ reset, onSuccess, onError, successAction }: UsePluginSubmitProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const setConfig = useSetAtom(pluginConfigAtom);

  const onSubmit = useCallback(
    async (data: PluginConfig) => {
      try {
        // kintoneへ保存
        storeConfig(data);

        // Jotai Atomの更新
        setConfig(data);

        // RHFの状態をリセット（isDirtyをクリア、現在の値を初期値とする）
        reset(data);

        enqueueSnackbar('設定を保存しました。', {
          variant: 'success',
          action: successAction,
        });

        onSuccess?.();
      } catch (e) {
        console.error(e);
        enqueueSnackbar('保存に失敗しました。', { variant: 'error' });
        onError?.();
      }
    },
    [reset, setConfig, enqueueSnackbar, onSuccess, onError, successAction]
  );

  return { onSubmit };
};
