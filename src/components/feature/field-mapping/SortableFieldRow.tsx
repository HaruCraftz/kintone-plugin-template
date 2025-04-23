import { type FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Tooltip } from '@mui/material';
import { type PrimitiveAtom } from 'jotai';
import { JotaiFieldSelect } from '@/components/jotai'; // パスは要確認
import { type SortableItemRenderProps } from '@/components/common/SortableItemWrapper';

// kintoneフィールドプロパティの型（仮定義、必要なら正確な型をインポート）
type KintoneFieldProperty = { code: string; label: string; type: string };

// フィールドマッピング項目の型
export interface FieldMappingItem {
  srcFieldCode: string;
  destFieldCode: string;
}

interface SortableFieldRowProps extends SortableItemRenderProps {
  // アプリケーション固有のProps
  index: number; // 親から渡されるインデックス
  field: FieldMappingItem;
  updateItem: (params: { index: number; newItem: FieldMappingItem }) => void;
  deleteItem: (index: number) => void;
  addItem: (params: { newItem: FieldMappingItem; index?: number }) => void;
  isDeleteEnabled: boolean;
  dateFieldsAtom: PrimitiveAtom<KintoneFieldProperty[]>; // Propsで受け取る
  textFieldAtom: PrimitiveAtom<KintoneFieldProperty[]>; // Propsで受け取る
}

/**
 * フィールドマッピング設定の1行を表示・操作するコンポーネント。
 */
export const SortableFieldRow: FC<SortableFieldRowProps> = ({
  // SortableItemWrapperから渡されるProps
  attributes,
  listeners,
  setNodeRef,
  style,
  // isDragging, // 必要に応じて利用
  // アプリケーション固有のProps
  index,
  field,
  updateItem,
  deleteItem,
  addItem,
  isDeleteEnabled,
  dateFieldsAtom,
  textFieldAtom,
}) => {
  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center gap-2 p-2 bg-white border border-transparent rounded hover:border-gray-300 hover:shadow-sm' // ホバー時のスタイル調整
    >
      {/* ドラッグハンドル */}
      <div {...attributes} {...listeners} className='text-gray-500 cursor-grab'>
        <DragIndicatorIcon fontSize='small' />
      </div>

      {/* 生年月日フィールド選択 */}
      <JotaiFieldSelect
        label='生年月日フィールド'
        fieldPropertiesAtom={dateFieldsAtom} // Propsを使用
        fieldCode={field.srcFieldCode}
        onChange={(srcFieldCode) =>
          updateItem({
            index: index, // 親から受け取ったindexを渡す
            newItem: { ...field, srcFieldCode }, // 更新するフィールドのみ指定
          })
        }
        // 必要であれば className や size などの Props を追加
      />

      {/* 年齢フィールド選択 */}
      <JotaiFieldSelect
        label='年齢フィールド'
        fieldPropertiesAtom={textFieldAtom} // Propsを使用
        fieldCode={field.destFieldCode}
        onChange={(destFieldCode) =>
          updateItem({
            index: index, // 親から受け取ったindexを渡す
            newItem: { ...field, destFieldCode }, // 更新するフィールドのみ指定
          })
        }
        // 必要であれば className や size などの Props を追加
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
          className='text-gray-600 hover:text-blue-600' // スタイル調整
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      {/* 削除ボタン */}
      <Tooltip title='この行を削除'>
        {/* isDeleteEnabled でボタン自体の表示/非表示を制御 */}
        <IconButton
          size='small'
          onClick={() => deleteItem(index)} // indexを渡す
          disabled={!isDeleteEnabled} // 削除不可の場合は無効化
          className={`text-gray-600 ${isDeleteEnabled ? 'hover:text-red-600' : 'opacity-50 cursor-not-allowed'}`} // スタイル調整
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </div>
  );
};
