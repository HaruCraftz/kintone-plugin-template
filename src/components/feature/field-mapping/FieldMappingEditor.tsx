// src/components/features/field-mapping/FieldMappingEditor.tsx
import { type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableList } from '@/components/common/SortableList'; // パス確認
import { useArray } from '@/config/hooks/useArray'; // パス確認
import { getConditionPropertyAtom } from '@/config/states/plugin'; // パス確認
import { appSingleLineTextFieldsAtom, appDateFieldsAtom } from '@/config/states/kintone'; // パス確認
import { SortableFieldRow, type FieldMappingItem } from './SortableFieldRow';
import { type SortableItemRenderProps } from '@/components/common/SortableItemWrapper'; // パス確認

/**
 * フィールドマッピング設定全体を管理・表示するコンポーネント。
 */
export const FieldMappingEditor: FC = () => {
  // フィールドマッピング設定用のAtomを取得
  const fieldsAtom = getConditionPropertyAtom('fieldMapping'); // Atom<FieldMappingItem[]> と仮定
  const [fields, setFields] = useAtom(fieldsAtom);
  const { addItem, deleteItem, updateItem } = useArray(fieldsAtom); // useArrayフックを利用

  // SortableListの並び替え完了時の処理
  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    // Jotai Atomの状態を直接更新
    setFields((currentFields) => arrayMove(currentFields, oldIndex, newIndex));
  };

  // SortableListに渡すアイテムレンダリング関数
  const renderMappingItem = (item: FieldMappingItem, index: number, sortableProps: SortableItemRenderProps) => (
    <SortableFieldRow
      // SortableItemWrapperからのPropsを展開
      {...sortableProps}
      // アプリケーション固有のPropsを渡す
      index={index} // 現在のインデックス
      field={item}
      updateItem={updateItem}
      deleteItem={deleteItem}
      addItem={addItem}
      isDeleteEnabled={fields.length > 1} // 項目が1つだけの時は削除不可
      dateFieldsAtom={appDateFieldsAtom} // 関連するAtomを渡す
      textFieldAtom={appSingleLineTextFieldsAtom} // 関連するAtomを渡す
    />
  );

  // SortableListに渡すgetItemId関数 (インデックスを使用)
  const getItemId = (_item: FieldMappingItem, index: number) => index;

  return (
    <div className='flex flex-col gap-1'>
      {' '}
      {/* 行間のスペースを狭める */}
      {fields.length > 0 ? (
        <SortableList<FieldMappingItem>
          items={fields}
          onSortEnd={handleSortEnd}
          renderItem={renderMappingItem}
          getItemId={getItemId} // インデックスをIDとして使用
          className='flex flex-col gap-1' // SortableList内のアイテムの間隔
        />
      ) : (
        // フィールドが空の場合の追加ボタン
        <div className='flex justify-center p-4 border border-gray-300 border-dashed rounded-md'>
          <Tooltip title='最初のフィールドマッピングを追加'>
            <IconButton
              color='primary'
              aria-label='最初のフィールドマッピングを追加'
              onClick={() => addItem({ newItem: { srcFieldCode: '', destFieldCode: '' } })}
            >
              <AddIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </div>
      )}
      {/* 常に一番下に行を追加するボタン（任意） */}
      {fields.length > 0 && (
        <div className='flex justify-start mt-2'>
          <Tooltip title='末尾に行を追加'>
            <IconButton
              size='small'
              onClick={() => addItem({ newItem: { srcFieldCode: '', destFieldCode: '' } })}
              className='text-gray-600 hover:text-blue-600'
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
