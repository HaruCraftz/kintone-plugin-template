import { restoreConfig } from '@/shared/config';
import { PluginLogger } from '@/shared/lib/logger';

const logger = new PluginLogger('Desktop');

/**
 * レコード画面表示時
 */
kintone.events.on(
  ['app.record.index.edit.show', 'app.record.create.show', 'app.record.edit.show'],
  (event) => {
    const { record } = event;
    const pluginConfig = restoreConfig();

    // デバッグ用ログ（開発者ツールのConsoleで確認）
    logger.group('レコード画面表示');
    logger.log('設定情報:', pluginConfig);
    logger.log('レコード:', record);
    logger.groupEnd();

    // ここにプラグインの処理を記述します
    pluginConfig.conditions.forEach(({ fieldCode, message }) => {
      if (!fieldCode || !message) return;
      // 例: フィールドコードとメッセージが設定されている場合の処理
      console.log(`Field: ${fieldCode}, Message: ${message}`);
    });

    return event;
  }
);

/**
 * レコード保存時
 */
kintone.events.on(
  ['app.record.index.edit.submit', 'app.record.create.submit', 'app.record.edit.submit'],
  (event) => {
    const { record } = event;
    const pluginConfig = restoreConfig();

    // デバッグ用ログ（開発者ツールのConsoleで確認）
    logger.group('レコード保存');
    logger.log('設定情報:', pluginConfig);
    logger.log('レコード (保存前):', JSON.parse(JSON.stringify(record)));
    logger.groupEnd();

    // ここに保存時の処理を記述します

    return event;
  }
);
