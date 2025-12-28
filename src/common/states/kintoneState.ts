import { atom } from 'jotai';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { getAppId, GUEST_SPACE_ID } from '../lib/kintone';

type ClientParams = {
  baseUrl: string;
  guestSpaceId?: string;
};

/**
 * アプリのフィールド情報を格納するAtom
 */
export const appFieldsAtom = atom(async () => {
  // KintoneRestAPIClientの生成
  const clientParams: ClientParams = { baseUrl: location.origin };
  if (GUEST_SPACE_ID) {
    clientParams.guestSpaceId = GUEST_SPACE_ID;
  }
  const client = new KintoneRestAPIClient(clientParams);

  // アプリのフィールド情報を取得
  const appId = getAppId();
  const { properties } = await client.app.getFormFields({ app: appId });

  // フィールド情報をソート
  return Object.values(properties).sort((a, b) => a.label.localeCompare(b.label, 'ja'));
});

/**
 * 特定の型のフィールド情報を格納するAtom
 * フィールドタイプ：SINGLE_LINE_TEXT
 */
export const appSingleLineTextFieldsAtom = atom(async (get) => {
  const allFields = await get(appFieldsAtom);
  // asyncの結果を待つため、ここでは get(appFieldsAtom) が解決されるのを自動で待ちます
  return allFields.filter((field) => field.type === 'SINGLE_LINE_TEXT');
});

/**
 * 特定の型のフィールド情報を格納するAtom
 * フィールドタイプ：DATE
 */
export const appDateFieldsAtom = atom(async (get) => {
  const allFields = await get(appFieldsAtom);
  // asyncの結果を待つため、ここでは get(appFieldsAtom) が解決されるのを自動で待ちます
  return allFields.filter((field) => field.type === 'DATE');
});
