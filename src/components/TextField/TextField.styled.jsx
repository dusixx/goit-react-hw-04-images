import styled from '@emotion/styled';
import { ButtonBase } from 'styles/shared';

export const Field = styled.label`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  height: ${({ height }) => height || '100%'};
  color: var(--color-text);
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 40px 0 20px;

  font-family: inherit;
  font-size: inherit;
  background-color: white;

  border-bottom-left-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);

  border: unset;
  outline: none;

  transition-property: background-color;
  transition-duration: var(--trans-duration);
  transition-timing-function: var(--trans-func);

  &::placeholder {
    opacity: 0.5;
    text-transform: capitalize;
  }

  &:focus-visible {
    background-color: var(--color-accent-lighter);
  }
`;

export const ClearBtn = styled(ButtonBase)`
  position: absolute;
  top: 50%;
  right: 10px;

  height: 60%;
  padding: 3px;

  color: gray;
  transform: translateY(-50%);
  transition-property: color;

  &:focus-visible,
  &:hover {
    color: var(--color-black);
  }
`;
