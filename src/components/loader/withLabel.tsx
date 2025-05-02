import { FC } from 'react';
import styled from '@emotion/styled';
import { Loader } from './loader';

type WithClassName<T> = T & { className?: string };
type Props = Readonly<{ label: string; size?: number }>;

const Component: FC<WithClassName<Props>> = ({ className, label, size }) => (
  <div {...{ className }}>
    <Loader size={size} />
    <p>{label}</p>
  </div>
);

const StyledComponent = styled(Component)`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  > p {
    color: #0007;
    margin: 0;
  }
`;

export const LoaderWithLabel = StyledComponent;
