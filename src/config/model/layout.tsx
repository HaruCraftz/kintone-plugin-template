import styled from '@emotion/styled';
import { css } from '@emotion/react';

const buildGridTemplate = (areas: string[][]) => {
  const areaNames = areas.map(([name]) => name).join(' ');
  const columnSizes = areas.map(([, size]) => size).join(' ');

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
