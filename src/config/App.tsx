import { type FC, Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { Loader } from '@/config/components/core/ui/loading';
import { store } from '@/shared/lib/jotai';
import { theme } from '@/shared/lib/mui';
import { PluginErrorBoundary } from './components/PluginErrorBoundary';
import { PluginContent } from './components/PluginContent';

const App: FC = () => {
  return (
    <Suspense fallback={<Loader label="アプリ情報を取得しています..." />}>
      <JotaiProvider store={store}>
        <ThemeProvider theme={theme}>
          {/* MUIのリセットCSSを適用 */}
          <CssBaseline />
          {/* 1. 全体のエラーをキャッチ */}
          <PluginErrorBoundary>
            {/* 2. 通知機能を有効化 */}
            <SnackbarProvider maxSnack={1}>
              {/* 3. コンポーネントやデータの読み込み待機 */}
              <Suspense fallback={<Loader label="設定情報を取得しています..." />}>
                {/* 4. メインコンテンツ */}
                <PluginContent />
              </Suspense>
            </SnackbarProvider>
          </PluginErrorBoundary>
        </ThemeProvider>
      </JotaiProvider>
    </Suspense>
  );
};

export default App;
