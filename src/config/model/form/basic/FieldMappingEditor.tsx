// src/components/features/field-mapping/FieldMappingEditor.tsx
import { type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableList } from '@/components/dnd/SortableList';
import { type SortableItemRenderProps } from '@/components/dnd/SortableItemWrapper';
import { useArray } from '@/config/hooks/useArray';
import { getConditionPropertyAtom } from '@/config/states/plugin';
import { SortableFieldRow, type FieldMappingItem } from './SortableFieldRow';

/**
 * フィールドマッピング設定全体を管理・表示するコンポーネント。
 */
export const FieldMappingEditor: FC = () => {
  const fieldsAtom = getConditionPropertyAtom('fieldMapping');
  const [fields, setFields] = useAtom(fieldsAtom);
  const { addItem, deleteItem, updateItem } = useArray(fieldsAtom);

  // SortableListの並び替え完了時の処理
  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    // Jotai Atomの状態を直接更新
    setFields((currentFields) => arrayMove(currentFields, oldIndex, newIndex));
  };

  const renderMappingItem = (item: FieldMappingItem, index: number, sortableProps: SortableItemRenderProps) => (
    <SortableFieldRow
      {...sortableProps}
      index={index}
      field={item}
      updateItem={updateItem}
      deleteItem={deleteItem}
      addItem={addItem}
      isDeleteEnabled={fields.length > 1} // 項目が1つだけの時は削除不可
    />
  );

  // SortableListに渡すgetItemId関数 (インデックスを使用)
  const getItemId = (_item: FieldMappingItem, index: number) => index;

  return (
    <div className='flex flex-col gap-1'>
      {fields.length > 0 ? (
        <SortableList<FieldMappingItem>
          items={fields}
          onSortEnd={handleSortEnd}
          renderItem={renderMappingItem}
          getItemId={getItemId} // インデックスをIDとして使用
          className='flex flex-col gap-1' // SortableList内のアイテムの間隔
        />
      ) : (
        <div className='flex justify-center p-4 border border-gray-300 border-dashed rounded-md'>
          <Tooltip title='設定を追加'>
            <IconButton
              color='primary'
              aria-label='設定を追加'
              onClick={() => addItem({ newItem: { srcFieldCode: '', destFieldCode: '' } })}
            >
              <AddIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
