import { useAtomValue } from 'jotai';
import type { KintoneFieldType } from '@/types/kintone';
import { appFieldsAtom } from '@/common/states/kintone';

const fieldTypeMap: Record<string, KintoneFieldType> = {
  recordNumber: 'RECORD_NUMBER',
  id: '__ID__',
  revision: '__REVISION__',
  creator: 'CREATOR',
  createdTime: 'CREATED_TIME',
  modifier: 'MODIFIER',
  updatedTime: 'UPDATED_TIME',
  singleLineText: 'SINGLE_LINE_TEXT',
  multiLineText: 'MULTI_LINE_TEXT',
  richText: 'RICH_TEXT',
  number: 'NUMBER',
  calc: 'CALC',
  checkBox: 'CHECK_BOX',
  radioButton: 'RADIO_BUTTON',
  multiSelect: 'MULTI_SELECT',
  dropDown: 'DROP_DOWN',
  userSelect: 'USER_SELECT',
  organizationSelect: 'ORGANIZATION_SELECT',
  groupSelect: 'GROUP_SELECT',
  date: 'DATE',
  time: 'TIME',
  dateTime: 'DATETIME',
  link: 'LINK',
  file: 'FILE',
  subtable: 'SUBTABLE',
  category: 'CATEGORY',
  status: 'STATUS',
  statusAssignee: 'STATUS_ASSIGNEE',
};
type FieldTypeKeyword = keyof typeof fieldTypeMap;

/**
 * kintoneのフィールド一覧を取得するフック
 * すべてのフィールド、または指定した型でフィルタリングしたリストを返却する
 */
export const useAppFields = (filterTypes?: FieldTypeKeyword[]) => {
  const allFields = useAtomValue(appFieldsAtom);
  const fields = filterTypes ? allFields.filter((f) => filterTypes.includes(f.type)) : allFields;
  const options = fields.map((f) => ({ label: f.label, value: f.code }));
  return { fields, options };
};
