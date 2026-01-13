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
    pluginConfig.conditions.forEach(({ srcFieldCode, destFieldCode }) => {
      const srcFieldValue: string | undefined = record[srcFieldCode]?.value;
      const destFieldValue: string | undefined = record[destFieldCode]?.value;
      const isInvalid = !srcFieldCode || !destFieldCode || !srcFieldValue || !destFieldValue;
      if (isInvalid) return;
      record[destFieldCode].disabled = true;
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
    const isUpdateOnSave = pluginConfig.common.isUpdateOnSave;

    pluginConfig.conditions.forEach(({ srcFieldCode, destFieldCode }) => {
      const srcFieldValue: string | undefined = record[srcFieldCode]?.value;
      const destFieldValue: string | undefined = record[destFieldCode]?.value;
      const isInvalid = !srcFieldCode || !destFieldCode || !srcFieldValue || !destFieldValue;

      if (isInvalid) return;
      if (destFieldValue && !isUpdateOnSave) return;

      const age = calculateAge(srcFieldValue);

      record[destFieldCode].value = age;
    });
    return event;
  }
);
