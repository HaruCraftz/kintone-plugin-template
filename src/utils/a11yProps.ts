// タブのアクセシビリティプロパティを取得する関数
export const a11yProps = (index: number) => {
  return {
    id: `plugin-tab-${index}`,
    'aria-controls': `plugin-tabpanel-${index}`,
  };
};
