import {
  latestPluginConfigVersion,
  latestPluginConditionSchema,
  type AnyPluginConfig,
  type PluginConfig,
  type PluginCondition,
} from '@/common/config/schema_old';
import { PLUGIN_ID } from '../constants/kintone';

/**
 * 新しいプラグインの設定値を取得します
 */
export const getNewCondition = (): PluginCondition => ({
  isUpdateOnSave: false,
  fieldMapping: [
    {
      srcFieldCode: '',
      destFieldCode: '',
    },
  ],
});

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): PluginConfig => ({
  version: latestPluginConfigVersion,
  condition: getNewCondition(),
});

/**
 * アプリにプラグインの設定情報を保存します
 * @param config プラグインの設定情報
 * @param callback 保存成功後に実行する処理. 省略すると、アプリ設定のプラグインの一覧画面に遷移し、設定完了メッセージを表示します。指定すると、アプリ設定のプラグインの一覧画面には遷移しません。
 */
export const storePluginConfig = (
  config: PluginConfig,
  options?: {
    callback?: () => void;
    debug?: boolean;
  }
): void => {
  const { callback, debug = false } = options || {};
  const convertedConfig = Object.entries(config)
    .filter(([, v]) => v !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: JSON.stringify(value) }), {});

  kintone.plugin.app.setConfig(convertedConfig, callback);
  if (debug) console.log('[plugin] config stored');
};

/**
 * プラグインの設定情報が、最新の設定情報の形式に準拠しているか検証します
 * @param condition - 検証する条件オブジェクト
 * @returns 検証結果`
 */
export const validatePluginCondition = (condition: unknown): boolean => {
  try {
    const result = latestPluginConditionSchema.parse(condition);
    return result !== undefined;
  } catch {
    return false;
  }
};

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * 各バージョンは次のバージョンへの変換処理を持ち、再帰的なアクセスによって最新のバージョンに変換されます
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: AnyPluginConfig): PluginConfig => {
  const { version } = anyConfig;
  switch (version) {
    case undefined:
      return migrateConfig({ ...anyConfig, version: latestPluginConfigVersion });
    case 1:
    default:
      // `default` -> `config.js`と`desktop.js`のバージョンが一致していない場合に通る可能性があるため必要
      // もし新しいバージョンを追加したらここに追加する
      // return migrateConfig({ version: 2, ...anyConfig });
      return anyConfig;
  }
};

/**
 * プラグインがアプリ単位で保存している設定情報を返却します
 * 設定情報の取得に失敗した場合は、nullを返却します
 * @param id プラグインID
 * @returns プラグインの設定情報
 */
export const restorePluginConfig = (options?: { debug: boolean }): PluginConfig => {
  const { debug = false } = options || {};
  const config: Record<string, string> = kintone.plugin.app.getConfig(PLUGIN_ID);
  if (debug) console.log('[plugin] config restored');
  if (!Object.keys(config).length) {
    return createConfig();
  }
  const restoredConfig = Object.entries(config).reduce<any>(
    (acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }),
    {}
  );
  return migrateConfig(restoredConfig);
};

export const restorePluginCondition = (options?: { debug: boolean }): PluginCondition => {
  const { debug = false } = options || {};
  const config = restorePluginConfig({ debug });
  const condition = config.condition;
  if (!validatePluginCondition(condition)) {
    return getNewCondition();
  }
  return condition;
};
