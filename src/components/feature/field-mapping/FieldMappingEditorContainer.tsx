import { type FC, memo, Suspense } from 'react';
import { FieldMappingEditor } from './FieldMappingEditor';
import { FieldMappingEditorPlaceholder } from './FieldMappingEditorPlaceholder';

/**
 * FieldMappingEditorをSuspenseでラップし、非同期ロードを処理するコンテナコンポーネント。
 * このコンポーネントを外部から利用します。
 */
const FieldMappingEditorContainer: FC = () => (
  <Suspense fallback={<FieldMappingEditorPlaceholder />}>
    {/* データ取得などの非同期処理が終わるまでPlaceholderが表示される */}
    <FieldMappingEditor />
  </Suspense>
);

// memo化して不要な再レンダリングを防ぐ
export default memo(FieldMappingEditorContainer);
