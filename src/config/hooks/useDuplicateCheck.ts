import { useCallback } from 'react';
import { useFormContext, useWatch, type Path } from 'react-hook-form';
import type { PluginConfig, PluginCondition } from '@/shared/config';

/**
 * 配列内のフィールド重複チェック用フック
 * @param index 現在の行番号
 * @param arrayKey 監視対象の配列フィールド名
 */
export const useDuplicateCheck = <T extends PluginConfig>(index: number, arrayKey: Path<T>) => {
  const { control } = useFormContext<T>();

  // 入力値を監視
  const items = useWatch({ control, name: arrayKey });

  const isDuplicate = useCallback(
    (code: string, key: keyof PluginCondition) => {
      if (!Array.isArray(items)) return false;
      return items.some((item, i) => i !== index && item[key] === code);
    },
    [items, index]
  );

  return { isDuplicate };
};
