import styled from '@emotion/styled';
import { css } from '@emotion/react';

const buildGridTemplate = (areas: string[][]) => {
  const areaNames = areas.map(([name]) => name).join(' ');
  const columnSizes = areas.map(([_, size]) => size).join(' ');

  return css`
    grid-template:
      'header' auto
      '${areaNames}' minmax(600px, 1fr) /
      ${columnSizes};
  `;
};

export const PluginLayout = styled.div`
  display: grid;
  gap: 16px;

  ${() => {
    const baseAreas: string[][] = [['content', '1fr']];
    const baseGrid = buildGridTemplate(baseAreas);

    return css`
      ${baseGrid}
    `;
  }}
`;

// ヘッダーエリア用のスタイル
export const HeaderArea = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

// コンテンツエリア用のスタイル
export const ContentArea = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 16px;
`;
