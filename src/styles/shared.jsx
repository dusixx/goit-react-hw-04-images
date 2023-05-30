import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { isStr, calcCSSValue } from 'utils';

// Utils

export const FlexCentered = cssProps => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${isStr(cssProps) ? css(cssProps) : { ...cssProps }}
`;

export const Disabled = css`
  pointer-events: none;
  filter: grayscale(1);
  opacity: 0.4;
`;

// Button

export const ButtonBase = styled.button`
  ${FlexCentered(`gap: 5px`)}
  padding: 0;

  color: currentColor;
  background-color: transparent;
  border: none;
  cursor: pointer;

  transition-timing-function: var(--trans-func);
  transition-duration: var(--trans-duration);

  &[disabled],
  &[disabled='true'] {
    ${Disabled}
  }
`;

export const ButtonPrimary = styled(ButtonBase)`
  padding-left: ${({ paddingSide }) => calcCSSValue(paddingSide) || '12px'};
  padding-right: ${({ paddingSide }) => calcCSSValue(paddingSide) || '12px'};

  padding-top: 7px;
  padding-bottom: 7px;

  font-size: 14px;
  color: white;

  background-color: var(--color-accent);
  border-radius: var(--border-radius);
  transition-property: background-color;

  &:focus-visible,
  &:hover {
    background-color: #296ff0;
    /* filter: brightness(1.1); */
  }
`;

export const CheckerboardBg = css`
  background-image: linear-gradient(
      45deg,
      #efefef 25%,
      transparent 0,
      transparent 75%,
      #efefef 0,
      #efefef
    ),
    linear-gradient(
      45deg,
      #efefef 25%,
      transparent 0,
      transparent 75%,
      #efefef 0,
      #efefef
    );

  background-position: 0 0, 10px 10px;
  background-color: #fff;
  background-size: 21px 21px;
`;
