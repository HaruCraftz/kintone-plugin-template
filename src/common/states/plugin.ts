import { atom } from 'jotai';
import { restoreConfig, type PluginConfig } from '@/common/config';

/**
 * kintoneから取得したプラグイン設定情報を管理するAtom
 */
export const pluginConfigAtom = atom<PluginConfig>(restoreConfig());
