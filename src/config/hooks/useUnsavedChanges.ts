import { useEffect } from 'react';

/**
 * 未保存の変更がある場合に、ブラウザのタブを閉じたりリロードしたりするのを防ぐフック
 * @param isDirty フォームに変更があるかどうか
 */
export const useUnsavedChanges = (isDirty: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        // 標準的なブラウザでの警告表示
        event.preventDefault();
        // Chromeなどの特定のブラウザで警告を出すために必要
        event.returnValue = '変更が保存されない可能性があります。';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
};
