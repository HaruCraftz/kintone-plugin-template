import { produce } from 'immer';
import { atom, type SetStateAction, type PrimitiveAtom } from 'jotai';
import { restorePluginConfig } from '@/lib/plugin';
import type { PluginCondition, PluginConfig } from '@/schema/plugin-config';

// ローディングのstate
export const loadingAtom = atom(false);

// プラグイン設定のstate
export const pluginConfigAtom = atom<PluginConfig>(restorePluginConfig());

// conditionプロパティのstate
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

// conditionプロパティ内のプロパティのstate
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
