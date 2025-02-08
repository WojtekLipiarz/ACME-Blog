import styled, { css } from 'styled-components';
import { darken } from 'polished';
import Link from 'next/link';

interface CardContainerProps {
  $isActive?: boolean;
  $color: string;
  $bg: string;
}

export const CardContainer = styled.div<CardContainerProps>`
  height: 433px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;

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

export const CardPostContainer = styled(Link)`
  /* height: 579px; */
  padding: 3rem 2.25rem 3.5rem;

  border-top-left-radius: ${({ theme }) => theme.radius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.background2};
`;

interface CategoryTextProps {
  $color: string;
}
export const CategoryText = styled.span<CategoryTextProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  font-style: italic;
  font-size: 0.875rem;
  margin-bottom: 0.625rem;

  ${({ theme, $color }) => css`
    span {
      position: relative;
      text-transform: uppercase;
      color: ${theme.colors[$color] || $color};

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background-color: currentColor;
      }
    }
  `}
`;

export const PostCardTitle = styled.p`
  font-family: Playfair Display;
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 4%;
  color: ${({ theme }) => theme.colors.accent3};
  margin-bottom: 2.25rem;
`;

export const PostCardDate = styled.p`
  font-family: Playfair Display;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.75rem;

  color: ${({ theme }) => theme.colors.accent3};
  margin-bottom: 2.25rem;
`;

export const PostCardBody = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.accent3};
  margin-bottom: 2.25rem;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
`;

export const MoreWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-family: Open Sans;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4rem;
`;
