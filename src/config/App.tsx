import { type FC, Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

import { LoadingView } from '@/common/components/loading';
import { theme } from '@/styles/themes';
import { PluginErrorBoundary } from './components/PluginErrorBoundary';

const App: FC = () => {
  return (
    <Suspense fallback={<LoadingView label="アプリ情報を取得しています..." />}>
      <JotaiProvider>
        <ThemeProvider theme={theme}>
          {/* MUIのリセットCSSを適用 */}
          <CssBaseline />
          {/* 1. 全体のエラーをキャッチ */}
          <PluginErrorBoundary>
            {/* 2. 通知機能を有効化 */}
            <SnackbarProvider maxSnack={3}>
              {/* 3. コンポーネントやデータの読み込み待機 */}
              <Suspense fallback={<LoadingView label="設定情報を取得しています..." />}>
                {/* 4. メインコンテンツ */}
              </Suspense>
            </SnackbarProvider>
          </PluginErrorBoundary>
        </ThemeProvider>
      </JotaiProvider>
    </Suspense>
  );
};

export default App;
