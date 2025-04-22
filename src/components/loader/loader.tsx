import { FC } from 'react';
import styled from '@emotion/styled';

type Props = { size?: string | number };

type WithClassName<T> = T & { className?: string };

const Component: FC<WithClassName<Props>> = ({ className }) => (
  <div className={className}>
    <div className='wave'></div>
    <div className='wave'></div>
    <div className='wave'></div>
    <div className='wave'></div>
  </div>
);

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  .wave {
    width: 5px;
    height: 40px;
    background: linear-gradient(45deg, #3498db, #1abc9c);
    margin: 0 5px;
    animation: wave 1.2s infinite ease-in-out;
    border-radius: 2px;
  }
  .wave:nth-child(2) {
    animation-delay: 0.1s;
  }
  .wave:nth-child(3) {
    animation-delay: 0.2s;
  }
  .wave:nth-child(4) {
    animation-delay: 0.3s;
  }

  @keyframes wave {
    0%,
    100% {
      transform: scaleY(0.5);
    }
    50% {
      transform: scaleY(1);
    }
  }
`;

export const Loader = StyledComponent;
