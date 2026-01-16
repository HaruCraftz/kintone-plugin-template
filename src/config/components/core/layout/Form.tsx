import { type FC } from 'react';
import { useAtomValue } from 'jotai';
import { Box } from '@mui/material';
import { activeTabIndexAtom } from '@/config/states/plugin';
import { type TabItem } from '@/config/components/features/FormTabs';

type Props = {
  tabs: TabItem[];
};

export const Form: FC<Props> = ({ tabs }) => {
  const activeTabIndex = useAtomValue(activeTabIndexAtom);

  return (
    <Box
      sx={{
        gridArea: 'content',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {tabs.map((tab, index) => (
        <Box
          key={index}
          role='tabpanel'
          hidden={activeTabIndex !== index}
          id={`plugin-tabpanel-${index}`}
          aria-labelledby={`plugin-tab-${index}`}
          sx={{
            p: 3,
            flexGrow: 1,
            display: activeTabIndex === index ? 'flex' : 'none',
            flexDirection: 'column',
          }}
        >
          {activeTabIndex === index && tab.content}
        </Box>
      ))}
    </Box>
  );
};
