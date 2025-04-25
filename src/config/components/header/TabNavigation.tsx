import type React from 'react';
import { type FC } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useAtom } from 'jotai';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { pluginTabs } from '@/config/model/header/tabs';

const HeaderTabNavigation: FC = () => {
  const [value, setValue] = useAtom(activeTabIndexAtom);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `plugin-tab-${index}`,
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
        {pluginTabs.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>
    </>
  );
};

export const TabNavigation: FC = () => {
  return <HeaderTabNavigation />;
};
