import { atom } from 'jotai';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { kintoneAPI } from '@/types/kintone/api';

export const appFieldsAtom = atom<Promise<kintoneAPI.FieldProperty[]>>(async () => {
  const client = new KintoneRestAPIClient();
  const app = kintone.app.getId();
  if (!app) {
    throw new Error('App ID is not available');
  }

  const { properties } = await client.app.getFormFields({ app });

  const values = Object.values(properties);
  return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
});

export const appSingleLineTextFieldsAtom = atom<Promise<kintoneAPI.FieldProperty[]>>(
  async (get) => {
    const fields = await get(appFieldsAtom);
    return fields.filter((field) => field.type === 'SINGLE_LINE_TEXT');
  }
);

export const appDateFieldsAtom = atom<Promise<kintoneAPI.FieldProperty[]>>(async (get) => {
  const fields = await get(appFieldsAtom);
  return fields.filter((field) => field.type === 'DATE');
});
