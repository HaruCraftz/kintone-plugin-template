import { useCallback } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { createConfig } from '@/common/config';
import { pluginConfigAtom } from '@/config/states/plugin';

/** プラグイン設定情報をリセットするカスタムフック */
export const useResetConfig = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useAtomCallback(
    useCallback(
      (_, set) => {
        set(pluginConfigAtom, createConfig());
        enqueueSnackbar('設定をリセットしました', { variant: 'error' });
      },
      [enqueueSnackbar]
    )
  );
};
