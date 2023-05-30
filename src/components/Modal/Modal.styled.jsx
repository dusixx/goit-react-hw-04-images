import styled from '@emotion/styled';

const DEF_COLOR_BG = 'rgb(0 0 0 / 0.5)';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 999;

  background-color: ${({ bgColor }) => bgColor || DEF_COLOR_BG};
  overflow: auto;
`;

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
`;
