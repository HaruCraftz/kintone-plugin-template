import { restoreConfig } from '@/shared/config';
import { calculateAge } from '@/shared/lib/calculate-age';

/**
 * レコード画面表示時
 */
kintone.events.on(
  ['app.record.index.edit.show', 'app.record.create.show', 'app.record.edit.show'],
  (event) => {
    const { record } = event;
    const pluginConfig = restoreConfig();

    // デバッグ用ログ（開発者ツールのConsoleで確認）
    console.group('[Plugin] レコード画面表示');
    console.log('設定情報:', pluginConfig);
    console.log('レコード:', record);
    console.groupEnd();

    pluginConfig.conditions.forEach(({ srcFieldCode, destFieldCode }) => {
      const srcField = record[srcFieldCode];
      const destField = record[destFieldCode];
      const isInvalid = !srcFieldCode || !destFieldCode || !srcField || !destField;
      if (isInvalid) return;
      destField.disabled = true;
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
    const isUpdateOnSave = pluginConfig.advanced.isUpdateOnSave;

    // デバッグ用ログ（開発者ツールのConsoleで確認）
    console.group('[Plugin] レコード保存');
    console.log('設定情報:', pluginConfig);
    console.log('isUpdateOnSave:', isUpdateOnSave);
    console.log('レコード (保存前):', JSON.parse(JSON.stringify(record)));

    pluginConfig.conditions.forEach(({ srcFieldCode, destFieldCode }, index) => {
      const srcField = record[srcFieldCode];
      const destField = record[destFieldCode];
      const isInvalid = !srcFieldCode || !destFieldCode || !srcField || !destField;

      console.log(`条件[${index}]:`, {
        srcFieldCode,
        destFieldCode,
        isInvalid,
        willUpdate: !isInvalid && (!destField.value || isUpdateOnSave),
      });

      if (isInvalid) return;
      if (destField.value && !isUpdateOnSave) return;

      const age = calculateAge(srcField.value);
      console.log(`条件[${index}] 計算結果:`, { 入力: srcField.value, 年齢: age });

      destField.value = age;
    });

    console.log('レコード (保存後):', record);
    console.groupEnd();

    return event;
  }
);
