import styled from '@emotion/styled';
import { ButtonPrimary } from 'styles/shared';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto 0 auto;
  padding: 20px;
  width: ${({ width }) => width || '100wh'};
`;

export const Button = styled(ButtonPrimary)`
  height: 45px;
  width: 140px;
  font-size: 15px;
  margin-bottom: 20px;
`;
