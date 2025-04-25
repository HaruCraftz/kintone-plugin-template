import { type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Tooltip } from '@mui/material';
import { JotaiFieldSelect } from '@/components/jotai';
import { type SortableItemRenderProps } from '@/components/dnd/SortableItemWrapper';
import { appSingleLineTextFieldsAtom, appDateFieldsAtom } from '@/config/states/kintone';

// フィールドマッピング項目の型
export interface FieldMappingItem {
  srcFieldCode: string;
  destFieldCode: string;
}

interface SortableFieldRowProps extends SortableItemRenderProps {
  index: number;
  field: FieldMappingItem;
  updateItem: (params: { index: number; newItem: FieldMappingItem }) => void;
  deleteItem: (index: number) => void;
  addItem: (params: { newItem: FieldMappingItem; index?: number }) => void;
  isDeleteEnabled: boolean;
}

/**
 * フィールドマッピング設定の1行を表示・操作するコンポーネント。
 */
export const SortableFieldRow: FC<SortableFieldRowProps> = ({
  attributes,
  listeners,
  setNodeRef,
  style,
  index,
  field,
  updateItem,
  deleteItem,
  addItem,
  isDeleteEnabled,
}) => {
  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center gap-2 p-2 bg-white border border-transparent rounded hover:border-gray-300 hover:shadow-sm'
    >
      {/* ドラッグハンドル */}
      <div {...attributes} {...listeners} className='text-gray-500 cursor-grab'>
        <DragIndicatorIcon fontSize='small' />
      </div>
      {/* 生年月日フィールド選択 */}
      <JotaiFieldSelect
        label='生年月日フィールド'
        fieldPropertiesAtom={appDateFieldsAtom}
        fieldCode={field.srcFieldCode}
        onChange={(srcFieldCode) =>
          updateItem({
            index: index, // 親から受け取ったindexを渡す
            newItem: { ...field, srcFieldCode }, // 更新するフィールドのみ指定
          })
        }
      />
      {/* 年齢フィールド選択 */}
      <JotaiFieldSelect
        label='年齢フィールド'
        fieldPropertiesAtom={appSingleLineTextFieldsAtom}
        fieldCode={field.destFieldCode}
        onChange={(destFieldCode) =>
          updateItem({
            index: index, // 親から受け取ったindexを渡す
            newItem: { ...field, destFieldCode }, // 更新するフィールドのみ指定
          })
        }
      />
      {/* 追加ボタン */}
      <Tooltip title='下に新しい行を追加'>
        <IconButton
          size='small'
          onClick={() =>
            addItem({
              newItem: { srcFieldCode: '', destFieldCode: '' },
              index: index + 1, // 現在の行の下に追加
            })
          }
          className='text-gray-600 hover:text-blue-600'
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {/* 削除ボタン */}
      <Tooltip title='この行を削除'>
        <IconButton
          size='small'
          onClick={() => deleteItem(index)} // indexを渡す
          disabled={!isDeleteEnabled}
          className={`text-gray-600 ${isDeleteEnabled ? 'hover:text-red-600' : 'opacity-50 cursor-not-allowed'}`}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </div>
  );
};
