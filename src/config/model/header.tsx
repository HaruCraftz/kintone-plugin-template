import { type FC } from 'react';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { loadingAtom } from '@/config/states/plugin';
import { TabNavigation } from '@/config/components/header/tab-navigation';
import SaveButton from '@/config/components/header/save-button';
import BackButton from '@/config/components/header/back-button';
import Menu from '@/config/components/header/menu';

// ヘッダーエリア用のスタイル
export const HeaderArea = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: sticky;
  top: 48px;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(238, 238, 238);
  z-index: 30;
`;

type ComponentProps = {
  loading: boolean;
};

const HeaderComponent: FC<ComponentProps> = ({ loading }) => {
  return (
    <>
      <div className='flex items-center gap-4'>
        <TabNavigation />
      </div>
      <div className='flex items-center gap-4'>
        <SaveButton loading={loading} />
        <BackButton loading={loading} />
        <Menu loading={loading} />
      </div>
    </>
  );
};

export const PluginHeader: FC = () => {
  const loading = useAtomValue(loadingAtom);

  return (
    <HeaderArea className='py-2'>
      <HeaderComponent loading={loading} />
    </HeaderArea>
  );
};
