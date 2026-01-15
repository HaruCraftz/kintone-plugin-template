import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useFormContext, type KeepStateOptions } from 'react-hook-form';
import { pluginConfigAtom } from '@/config/states/plugin';
import { type PluginConfig } from '@/shared/config';

/**
 * プラグインの状態 (Jotai & React Hook Form) を同期的に更新するためのベースフック
 */
export const useSyncPluginConfig = () => {
  const setConfig = useSetAtom(pluginConfigAtom);
  const { reset } = useFormContext<PluginConfig>();

  /**
   * 指定された設定データで各種状態を一括更新する
   * @param data 同期する最新の設定情報
   * @param options RHFのresetに渡すオプション。状態制御などに使用。
   */
  const syncConfig = useCallback(
    (data: PluginConfig, options?: KeepStateOptions) => {
      // JotaiのAtomを更新（グローバル状態の同期）
      setConfig(data);
      // RHFの内部状態をリセット（フォーム表示とisDirty等のメタ状態を同期）
      reset(data, options);
    },
    [setConfig, reset]
  );

  return { syncConfig };
};
