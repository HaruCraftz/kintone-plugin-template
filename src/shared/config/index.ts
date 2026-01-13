import {
  LATEST_PLUGIN_VERSION,
  PluginConfigSchema,
  type PluginConfig,
  type PluginCondition,
  type AnyPluginConfig,
} from './schema';
import { PLUGIN_ID } from '@/shared/lib/kintone';
import { nanoid } from 'nanoid';

export * from './schema';

/**
 * 初期化: デフォルトの設定値を取得
 */
export const getNewCondition = (): PluginCondition => ({
  id: nanoid(),
  srcFieldCode: '',
  destFieldCode: '',
});

/**
 * 初期化: デフォルトの設定情報を返す
 */
export const createConfig = (): PluginConfig => ({
  version: LATEST_PLUGIN_VERSION,
  common: {
    isUpdateOnSave: false,
  },
  conditions: [getNewCondition()],
});

/**
 * 保存: 設定情報をJSON文字列に変換してkintoneに保存
 */
export const storeConfig = (config: PluginConfig, callback?: () => void): void => {
  const rawConfig = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key, JSON.stringify(value)])
  );
  kintone.plugin.app.setConfig(rawConfig, callback);
};

/**
 * 変換: 古い設定情報を新しい設定情報に変換
 */
const migrateConfig = (anyConfig: AnyPluginConfig): PluginConfig => {
  const { version, ...other } = anyConfig;
  switch (version) {
    case undefined:
      return migrateConfig({ version: 1, ...other });
    case 1:
    default:
      return anyConfig;
  }
};

/**
 * 復元: kintoneから取得し、Zodで検証・補完して返す
 */
export const restoreConfig = (): PluginConfig => {
  try {
    const rawConfig: Record<string, string> = kintone.plugin.app.getConfig(PLUGIN_ID);

    // データが空なら初期値をパースして返す
    if (!Object.keys(rawConfig).length) return createConfig();

    // パース処理
    const parsed = Object.fromEntries(
      Object.entries(rawConfig).map(([k, v]) => [k, JSON.parse(v)])
    );

    // 新しい設定に変換
    return PluginConfigSchema.parse(migrateConfig(parsed as AnyPluginConfig));
  } catch (error) {
    console.error('[Plugin] 設定の復元に失敗しました。', error);
    return createConfig();
  }
};
