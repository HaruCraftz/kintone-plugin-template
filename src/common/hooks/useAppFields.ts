import { useAtomValue } from 'jotai';
import { appFieldsAtom } from '@/common/states/kintoneState';

/**
 * kintoneのフィールド一覧を取得するフック
 * すべてのフィールド、または指定した型でフィルタリングしたリストを返却する
 */
export const useAppFields = (filterTypes?: string[]) => {
  const allFields = useAtomValue(appFieldsAtom);

  const fields = filterTypes ? allFields.filter((f) => filterTypes.includes(f.type)) : allFields;

  const options = fields.map((f) => ({
    label: `${f.label} (${f.code})`,
    value: f.code,
  }));

  return { fields, options };
};
