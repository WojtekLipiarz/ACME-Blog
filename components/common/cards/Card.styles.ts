import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface CardContainerProps {
  $isActive?: boolean;
  $color: string;
  $bg: string;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;
  height: 300px;

  border-top-left-radius: ${({ theme }) => theme.radius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme, $bg }) =>
    theme.colors[$bg] || theme.colors.accent1};
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.white};

  span {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
  }

  ${({ theme, $isActive, $bg }) =>
    $isActive &&
    css`
      border-width: 6px;
      border-style: solid;
      border-color: ${darken(0.2, theme.colors[$bg] || theme.colors.accent1)};

      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    `}
`;
