import { type FC } from 'react';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { loadingAtom } from '@/config/states/plugin';
import { TabNavigation, type TabItem } from '../components/header/tab-navigation';
import SaveButton from '../components/header/save-button';
import BackButton from '../components/header/back-button';
import Menu from '../components/header/menu';
import { PluginForm } from './form/basic';

const HeaderContent = styled.div`
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

type Props = {
  loading: boolean;
};

const Component: FC<Props> = ({ loading }) => {
  // タブの設定
  const tabs: TabItem[] = [
    {
      label: '基本設定',
      content: <PluginForm />,
    },
    {
      label: '詳細設定',
      content: <div>詳細設定の内容（未実装）</div>,
    },
  ];

  return (
    <>
      <div className='flex items-center gap-4'>
        <TabNavigation tabs={tabs} />
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
    <HeaderContent className='py-2'>
      <Component loading={loading} />
    </HeaderContent>
  );
};
