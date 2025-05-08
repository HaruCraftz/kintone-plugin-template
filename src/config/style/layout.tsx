import styled from '@emotion/styled';

export const PluginLayout = styled.div`
  display: grid;
  gap: 16px;
  min-height: 100vh;

  /*
   * グリッドエリアの定義
   */
  grid-template-areas:
    'header'
    'content';

  /*
   * 行の高さを定義
   */
  grid-template-rows: auto 1fr;

  /*
   * 列の幅を定義
   */
  grid-template-columns: 1fr;
`;
