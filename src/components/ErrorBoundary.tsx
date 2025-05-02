import React, { type FC, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Alert, AlertTitle, Button } from '@mui/material';
import styled from '@emotion/styled';
import { LoaderWithLabel } from './loader/withLabel';
import { isProd } from '@/lib/global';

const ErrorFallbackComponent: FC<FallbackProps & { className?: string }> = ({
  className,
  error,
  resetErrorBoundary,
}) => {
  const [loading, setLoading] = useState(false);

  const onRetry = () => {
    setLoading(true);
    setTimeout(() => {
      resetErrorBoundary();
      setLoading(false);
    }, 3000);
  };

  if (loading) {
    return <LoaderWithLabel label='再試行中' />;
  }

  return (
    <div className={className}>
      <Alert severity='error'>
        <AlertTitle title={error.message}>エラーが発生しました</AlertTitle>
        {!isProd && (
          <p>
            エラー内容：
            <br />
            {error.message}
          </p>
        )}
        <h2>解決方法</h2>
        <ol>
          <li>
            <h3>処理をリトライ</h3>
            <p>以下の「リトライ」ボタンをクリックして、処理を再実行してください。</p>
            <Button variant='contained' color='error' onClick={onRetry}>
              リトライ
            </Button>
          </li>
          <li>
            <h3>プラグイン設定を更新</h3>
            <p>アプリ設定からこのプラグインの設定を開き、再度保存した上でアプリを更新してください。</p>
          </li>
        </ol>
      </Alert>
    </div>
  );
};

const StyledErrorFallback = styled(ErrorFallbackComponent)`
  margin: 8px;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  h3 {
    font-size: 18px;
    margin: 0 0 6px;
    font-weight: bold;
  }
  p {
    margin: 0 0 8px;
  }
  ol {
    display: grid;
    gap: 32px;
    padding-inline-start: 16px;
  }
`;

export const PluginErrorBoundary: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary FallbackComponent={StyledErrorFallback}>{children}</ErrorBoundary>
);
