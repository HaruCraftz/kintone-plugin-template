// src/config/components/header/tab-navigation.tsx (修正)
import type React from 'react';
import { type FC } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useAtom } from 'jotai';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { pluginTabs } from '@/config/model/tabs';
import { a11yProps } from '@/utils/a11yProps';

const HeaderTabNavigation: FC = () => {
  const [value, setValue] = useAtom(activeTabIndexAtom);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
      </Box>
    </>
  );
};

export const TabNavigation: FC = () => {
  return <HeaderTabNavigation />;
};
