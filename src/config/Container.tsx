import { Provider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { FC, Suspense } from 'react';
import { LoaderWithLabel } from '@/components/loader/withLabel';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PluginErrorBoundary } from '@/components/ErrorBoundary';
import { store } from '@/lib/store';
import { PluginLayout } from './model/layout';
import { PluginHeader } from './model/header';
import { PluginForm } from './model/form';

/**
 * TODO: ディレクトリ整理
 * TODO: 正常に設定保存できるように修正
 * TODO: 入力項目を連動プルダウンに変更
 * TODO: 入力項目に必須チェックを実装
 * TODO: menu を追加
 */
const Container: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    {/* Provider が jotai atom の状態をコンポーネントツリー全体で共有可能にする */}
    <Provider store={store}>
      {/* ThemeProvider で全体のテーマを統一する */}
      <ThemeProvider>
        <PluginErrorBoundary>
          {/* maxSnack は同時に表示できる Snackbar の最大数 */}
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              {/* プラグイン設定画面の全体のスタイルを適用する */}
              <PluginLayout>
                {/* プラグイン設定画面のヘッダーコンポーネント */}
                <PluginHeader />
                {/* プラグイン設定画面のフォームコンポーネント */}
                <PluginForm />
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginErrorBoundary>
      </ThemeProvider>
    </Provider>
  </Suspense>
);

export default Container;
