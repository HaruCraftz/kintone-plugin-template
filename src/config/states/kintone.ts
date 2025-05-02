import { type Atom, atom } from 'jotai';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { kintoneAPI } from '@/types/kintone/api';
import { GUEST_SPACE_ID } from '@/lib/global';

type ClientParams = {
  baseUrl: string;
  guestSpaceId?: string;
};

export type AppFieldsAtom = Atom<Promise<kintoneAPI.FieldProperty[]>>;

export const appFieldsAtom: AppFieldsAtom = atom(async () => {
  const clientParams: ClientParams = { baseUrl: location.origin };
  if (GUEST_SPACE_ID) {
    clientParams.guestSpaceId = GUEST_SPACE_ID;
  }

  const client = new KintoneRestAPIClient(clientParams);

  const app = kintone.app.getId();
  if (!app) {
    throw new Error('App ID is not available');
  }

  const { properties } = await client.app.getFormFields({ app });

  const values = Object.values(properties);
  return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
});

export const appSingleLineTextFieldsAtom = atom(async (get) => {
  const fields = await get(appFieldsAtom);
  return fields.filter((field) => field.type === 'SINGLE_LINE_TEXT');
});

export const appDateFieldsAtom = atom(async (get) => {
  const fields = await get(appFieldsAtom);
  return fields.filter((field) => field.type === 'DATE');
});
