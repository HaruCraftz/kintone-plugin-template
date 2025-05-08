import type React from 'react';
import { type FC } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useAtom } from 'jotai';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { tabs } from '@/config/model/tabs';

export const TabNavigation: FC = () => {
  const [value, setValue] = useAtom(activeTabIndexAtom);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `plugin-tab-${index}`,
      // IDで指定した要素を操作するものとスクリーンリーダーに伝えるための属性
      'aria-controls': `plugin-tabpanel-${index}`,
    };
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='プラグイン設定タブ'
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>
    </>
  );
};
