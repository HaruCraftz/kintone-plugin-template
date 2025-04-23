import { produce } from 'immer';
import { atom, type SetStateAction, type PrimitiveAtom } from 'jotai';
import { restorePluginConfig } from '@/lib/plugin';
import type { PluginCondition, PluginConfig } from '@/schema/pluginConfig';

// ローディングの状態を保持するatom
export const loadingAtom = atom(false);

// アクティブなタブのインデックスを保持するatom
export const activeTabIndexAtom = atom(0);

// プラグイン設定のstate
export const pluginConfigAtom = atom<PluginConfig>(restorePluginConfig());

// conditionプロパティを持つatom
export const pluginConditionAtom = atom(
  (get) => get(pluginConfigAtom).condition,
  (_, set, newValue: SetStateAction<PluginCondition>) => {
    set(pluginConfigAtom, (current) =>
      produce(current, (draft) => {
        draft.condition = typeof newValue === 'function' ? newValue(draft.condition) : newValue;
      })
    );
  }
);

// conditionプロパティ内のプロパティを取得するatom
export const getConditionPropertyAtom = <T extends keyof PluginCondition>(
  property: T
): PrimitiveAtom<PluginCondition[T]> =>
  atom(
    (get) => get(pluginConditionAtom)[property],
    (_, set, newValue: SetStateAction<PluginCondition[T]>) => {
      set(pluginConditionAtom, (condition) =>
        produce(condition, (draft) => {
          draft[property] = typeof newValue === 'function' ? newValue(draft[property]) : newValue;
        })
      );
    }
  );
