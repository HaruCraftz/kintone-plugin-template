import { restorePluginCondition } from '@/lib/plugin';
import { calculateAge } from './features/calculate-age';

kintone.events.on(
  ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'],
  (event) => {
    const record = event.record;
    const pluginCondition = restorePluginCondition();
    const { fieldMapping } = pluginCondition;

    fieldMapping.forEach((mapping) => {
      const { destFieldCode } = mapping;

      if (destFieldCode || record[destFieldCode]) {
        record[destFieldCode].disabled = true;
      }
    });
  }
);

kintone.events.on(
  ['app.record.create.submit', 'app.record.edit.submit', 'app.record.index.edit.submit'],
  (event) => {
    const record = event.record;
    const pluginCondition = restorePluginCondition();
    const { isUpdateOnSave, fieldMapping } = pluginCondition;

    fieldMapping.forEach((mapping) => {
      const { srcFieldCode, destFieldCode } = mapping;

      if (!srcFieldCode || !destFieldCode || !record[srcFieldCode] || !record[destFieldCode]) {
        return;
      }

      if (!isUpdateOnSave) {
        return;
      }

      const fieldValue = record[srcFieldCode].value as string;

      if (fieldValue) {
        const age = calculateAge(fieldValue);
        record[destFieldCode].value = `${age}歳`;
      }
    });
  }
);
