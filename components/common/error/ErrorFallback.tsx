import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { SWIPER_BREAKPOINTS } from 'utils/constants';

interface ErrorFallbackrops {
  error?: string;
}

const FallbackContainer = styled.div`
  padding: 1rem;
  margin-top: 2rem;
  margin-left: ${({ theme }) => theme.layoutPadding.xs};
  margin-right: ${({ theme }) => theme.layoutPadding.xs};
  background-color: ${({ theme }) => lighten(0.4, theme.colors.danger)};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: 0.5rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    margin-left: ${({ theme }) => theme.layoutPadding.md};
    margin-right: ${({ theme }) => theme.layoutPadding.md};
  }
  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    margin-top: 4rem;
    margin-left: ${({ theme }) => theme.layoutPadding.lg};
    margin-right: ${({ theme }) => theme.layoutPadding.lg};
  }

  h2,
  p {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export function ErrorFallback({ error }: ErrorFallbackrops) {
  return (
    <FallbackContainer>
      <h2>Coś poszło nie tak.</h2>
      {error && <p>{error}</p>}
    </FallbackContainer>
  );
}
