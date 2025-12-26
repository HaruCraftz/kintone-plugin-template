import { type FC, Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { LoadingView } from '@/common/components/loading';
import { theme } from '@/styles/themes';

const App: FC = () => {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        {/* MUIのリセットCSSを適用 */}
        <CssBaseline />
        {/* SuspenseをThemeProviderの内側に入れることで、Loader内でもテーマが使える */}
        <Suspense fallback={<LoadingView label="画面を準備しています..." />}>
          {/* ここにメインのコンテンツ（PluginLayoutなど）が入る */}
        </Suspense>
      </ThemeProvider>
    </JotaiProvider>
  );
};

export default App;
