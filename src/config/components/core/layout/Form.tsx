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
    <Box sx={{ gridArea: 'content' }}>
      {tabs.map((tab, index) => (
        <Box
          key={index}
          role="tabpanel"
          hidden={activeTabIndex !== index}
          id={`plugin-tabpanel-${index}`}
          aria-labelledby={`plugin-tab-${index}`}
          sx={{ py: 3 }}
        >
          {activeTabIndex === index && tab.content}
        </Box>
      ))}
    </Box>
  );
};
