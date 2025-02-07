import styled, { css } from 'styled-components';

interface ButtonTextWrapperProps {
  $size?: number;
  $color: string;
  $isActive?: boolean;
}

export const ButtonTextWrapper = styled.button<ButtonTextWrapperProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.125rem;

  color: ${({ theme }) => theme.colors.accent5};
  font-size: ${({ $size }) => `${$size}px`};
  font-family: Poppins;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;

  border: 0;
  background-color: transparent;

  span {
    color: inherit;
  }
  ${({ theme, $isActive, $color }) =>
    $isActive &&
    css`
      span {
        position: relative;
        color: ${theme.colors[$color] || $color};

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 2px;
          background-color: currentColor;
        }
      }
    `}
`;
